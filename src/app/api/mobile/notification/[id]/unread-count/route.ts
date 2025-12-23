import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.notifikasi.count({
      where: {
        recipientId: id,
        isRead: false,
      },
    });

    console.log("List Notification >>", data);

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to get unread count",
    });
  }
}

type Pilihan = "PENGIRIM" | "PENERIMA";

const data: Pilihan = "PENERIMA";
