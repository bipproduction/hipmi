import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export { GET, PUT };

async function GET(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  try {
    const { id, status } = params;
    const fixStatusName = _.startCase(status);

    const data = await prisma.event.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        active: true,
        authorId: id,
        isArsip: false,
        EventMaster_Status: {
          name: fixStatusName,
        },
      },
      select: {
        id: true,
        title: true,
        deskripsi: true,
        tanggal: true,
        tanggalSelesai: true,
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

async function PUT(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  try {
    const { id, status } = params;
    const fixStatusName = _.startCase(status);

    const checkData = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        EventMaster_Status: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!checkData) {
      return NextResponse.json({
        success: false,
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    if (checkData?.EventMaster_Status?.name === "Publish") {
      return NextResponse.json({
        success: false,
        message: "Event telah terpublish",
        status: 400,
      });
    }

    const checkStatus = await prisma.eventMaster_Status.findFirst({
      where: {
        name: fixStatusName,
      },
    });

    if (!checkStatus) {
      return NextResponse.json({
        success: false,
        message: "Status tidak ditemukan",
        status: 404,
      });
    }

    const updateData = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        eventMaster_StatusId: checkStatus.id,
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
        message: "Error update event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
