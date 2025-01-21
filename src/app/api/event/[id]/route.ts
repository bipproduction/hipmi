import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    let fixData;
    const { id } = context.params;

    fixData = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: {
          include: {
            Profile: true,
          },
        },
        EventMaster_TipeAcara: true,
        EventMaster_Status: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    await prisma.$disconnect();

    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}


