import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { saveDocAndComments } from "@/actions/user/queries";
import { onUserInfo } from "@/actions/user";

export async function POST(req: NextRequest) {
  try {
    const { filename, originalName, content } = await req.json();

    if (!filename || !originalName || !content) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Converting CSV to TEXT
    const parsed = Papa.parse<string[]>(content, {
      skipEmptyLines: true,
    });
    const comments = parsed.data
      .flat()
      .map((c) => c.trim())
      .filter((text) => text && isNaN(Number(text))); // exclude numbers

    if (comments.length === 0) {
      return NextResponse.json(
        { error: "CSV contains no comments" },
        { status: 400 }
      );
    }

    console.log("✅ The document converted successfully.");

    const userResponse = await onUserInfo();
    const user = userResponse.data;
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // SAVE to DB Query
    const doc = await saveDocAndComments(
      originalName,
      filename,
      comments,
      user.id
    );

    console.log("✅ The document saved successfully.");

    return NextResponse.json({ success: true, docId: doc.id });
  } catch (err) {
    console.error("Error uploading document:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
