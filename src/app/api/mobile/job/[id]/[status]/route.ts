import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export { GET, PUT };

async function GET(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  try {
    const { id, status } = params;
    const fixStatusName = _.startCase(status);

    const data = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        isActive: true,
        authorId: id,
        isArsip: false,
        MasterStatus: {
          name: fixStatusName,
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get job",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get job",
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

    const checkData = await prisma.job.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        MasterStatus: {
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

    if (checkData?.MasterStatus?.name === "Publish") {
      return NextResponse.json({
        success: false,
        message: "Job telah terpublish",
        status: 400,
      });
    }

    const checkStatus = await prisma.masterStatus.findFirst({
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

    const updateData = await prisma.job.update({
      where: {
        id: id,
      },
      data: {
        masterStatusId: checkStatus.id,
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
        message: "Error update job",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
