import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, PUT };

async function GET(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  const { id, status } = params;
  const fixStatusName = _.startCase(status);

  try {
    const data = await prisma.investasi.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        authorId: id,
        MasterStatusInvestasi: {
          name: fixStatusName,
        },
      },
      select: {
        id: true,
        title: true,
        targetDana: true,
        imageId: true,
        countDown: true,
        updatedAt: true,
        MasterPencarianInvestor: {
          select: {
            name: true,
          },
        },
      },
    });

    const fixData = data.map((v: any) => ({
      ..._.omit(v, ["MasterPencarianInvestor"]),
      pencarianInvestor: v.MasterPencarianInvestor.name,
    }));

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR GET INVESTASI]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Mendapatkan Data",
      reason: error || (error as Error).message,
    });
  }
}

async function PUT(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  const { id, status } = params;
  const fixStatusName = _.startCase(status);

  console.log("[PUT INVESTASI]", id, fixStatusName);    

  try {
    const checkStatus = await prisma.masterStatusInvestasi.findFirst({
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

    const updateData = await prisma.investasi.update({
      where: {
        id: id,
      },
      data: {
        masterStatusInvestasiId: checkStatus.id,
      },
    });

    console.log("[UPDATE INVESTASI]", updateData);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Update berhasil",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Update Data",
      reason: error || (error as Error).message,
    });
  }
}
