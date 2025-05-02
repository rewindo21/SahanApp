import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { onUserInfo } from "@/actions/user";

export async function GET(req: NextRequest) {
  try {
    const { onUserInfo } = await import("@/actions/user"); // ← lazy import
    const userResponse = await onUserInfo();
    const user = userResponse.data;

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const docs = await prisma.docs.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fileName: true,
        filePath: true,
        createdAt: true,
        positiveResults: true,
        negativeResults: true,
        neutralResults: true,
      },
    });

    return NextResponse.json({ docs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load docs" }, { status: 500 });
  }
}
