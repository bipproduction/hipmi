import { event_getOneById } from "@/app_modules/event/fun/get/get_one_by_id";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let fixData;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const checkDataEvent = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        tanggal: true,
        tanggalSelesai: true,
        lokasi: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!checkDataEvent) {
      return NextResponse.json(
        { message: "Event Not Found", response: null },
        { status: 400 }
      );
    }

    let peserta;
    const checkPeserta = await prisma.event_Peserta.findFirst({
      where: {
        userId: userId,
        eventId: id,
      },
    });

    if (checkPeserta) {
      peserta = true;
    } else {
      peserta = false;
    }

    let kehadiran;
    const checkKehadiran = await prisma.event_Peserta.findFirst({
      where: {
        userId: userId,
        eventId: id,
      },
      select: {
        isPresent: true,
      },
    });

    if (checkKehadiran?.isPresent) {
      kehadiran = true;
    } else {
      kehadiran = false;
    }

    fixData = {
      dataEvent: checkDataEvent,
      peserta: peserta,
      kehadiran: kehadiran,
    };

    return NextResponse.json(
      { message: "Event Found", res: fixData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error get data event",
        response: null,
        error: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
