import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST };

async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const create = await prisma.event.create({
      data: {
        title: _.startCase(data.title),
        lokasi: data.lokasi,
        deskripsi: data.deskripsi,
        eventMaster_TipeAcaraId: data.eventMaster_TipeAcaraId,
        tanggal: data.tanggal,
        tanggalSelesai: data.tanggalSelesai,
        authorId: data.authorId,
      },
      select: {
        id: true,
        title: true,
        EventMaster_Status: {
          select: {
            name: true,
          },
        },
        authorId: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil disimpan",
        data: create,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error create event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
