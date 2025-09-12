import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export { DELETE, GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        lokasi: true,
        deskripsi: true,
        tanggal: true,
        tanggalSelesai: true,
        eventMaster_StatusId: true,
        eventMaster_TipeAcaraId: true,
        EventMaster_Status: {
          select: {
            name: true,
          },
        },
        EventMaster_TipeAcara: {
          select: {
            name: true,
          },
        },
        authorId: true,
        Author: {
          include: {
            Profile: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get event",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data } = await request.json();

    const update = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        title: _.startCase(data.title),
        lokasi: data.lokasi,
        deskripsi: data.deskripsi,
        eventMaster_TipeAcaraId: data.eventMaster_TipeAcaraId,
        tanggal: data.tanggal,
        tanggalSelesai: data.tanggalSelesai,
        authorId: data.authorId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Update berhasil",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Update gagal",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deleteData = await prisma.event.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Delete berhasil",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Delete gagal",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
