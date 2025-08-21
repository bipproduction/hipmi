import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: {
          select: {
            username: true,
            nomor: true,
            Profile: {
              select: {
                name: true,
                alamat: true,
              },
            },
          },
        },
        EventMaster_TipeAcara: {
          select: {
            name: true,
          },
        },
        EventMaster_Status: true,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data event detail",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data event detail >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data event detail",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
