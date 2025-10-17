import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await prisma.job.findUnique({
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
        MasterStatus: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data job-vacancy",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data job-vacancy",
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

  let fixData;
  try {
    const checkStatus = await prisma.masterStatus.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus)
      return NextResponse.json(
        {
          success: false,
          message: "Error update data job-vacancy",
          reason: "Status not found",
        },
        { status: 500 }
      );

    if (fixStatus === "Reject") {
      const updt = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          masterStatusId: checkStatus.id,
          catatan: data,
        },
        select: {
          id: true,
          authorId: true,
          MasterStatus: {
            select: {
              name: true,
            },
          },
          title: true,
        },
      });

      fixData = updt;
    } else if (fixStatus === "Publish") {
      const updt = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          masterStatusId: checkStatus.id,
        },
        select: {
          id: true,
          authorId: true,
          MasterStatus: {
            select: {
              name: true,
            },
          },
          title: true,
        },
      });

      fixData = updt;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success update data job-vacancy",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error update data job-vacancy",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
