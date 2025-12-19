import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log("Id >>", id);

  try {
    const data = await prisma.notifikasi.findMany({
      where: {
        userId: id,
        isRead: false,
      },
    });

    console.log("Data >>", data);

    return NextResponse.json({
      success: true,
      data: data.length,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to get unread count",
    });
  }
}
