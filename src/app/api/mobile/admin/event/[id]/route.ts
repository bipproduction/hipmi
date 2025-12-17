import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
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
        message: "Success get data event",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);

  console.log("ID", id);
  console.log("DATA", data);
  console.log("FIX STATUS", fixStatus);

  let fixData;
  try {
    const checkStatus = await prisma.eventMaster_Status.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus)
      return NextResponse.json(
        {
          success: false,
          message: "Error update data event",
          reason: "Status not found",
        },
        { status: 500 }
      );

    if (fixStatus === "Reject") {
      const updateData = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          catatan: data,
          eventMaster_StatusId: checkStatus.id,
        },
      });

      fixData = updateData;
    } else if (fixStatus === "Publish") {
      const updateData = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          eventMaster_StatusId: checkStatus.id,
        },
      });

      fixData = updateData;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success update data event",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
