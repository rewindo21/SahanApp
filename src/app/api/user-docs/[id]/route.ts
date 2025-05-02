import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { onUserInfo } from "@/actions/user";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userResponse = await onUserInfo();
    const user = userResponse.data;

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doc = await prisma.docs.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!doc) {
      return NextResponse.json({ error: "Doc not found" }, { status: 404 });
    }

    await prisma.docs.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete doc" },
      { status: 500 }
    );
  }
}
