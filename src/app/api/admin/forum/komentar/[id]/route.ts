import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.forum_Komentar.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        isActive: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
          },
        },
        komentar: true,
        forum_PostingId: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success get data komentar",
      data: data,
    });
  } catch (error) {
    console.error("Error get data komentar", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data komentar",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
