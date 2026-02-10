import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET, PUT };

async function GET(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  const { id, status } = params;
  const fixStatus = _.startCase(status);
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const takeData = PAGINATION_DEFAULT_TAKE
  const skipData = page * takeData - takeData;

  let fixData;
  let meta = null;
  
  try {
    const checkStatus = await prisma.donasiMaster_StatusDonasi.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus)
      return NextResponse.json({
        status: 400,
        success: false,
        reason: "Gagal mendapatkan data",
      });

    const res = await prisma.donasi.findMany({
      where: {
        authorId: id,
        donasiMaster_StatusDonasiId: checkStatus.id,
        active: true,
      },
      select: {
        id: true,
        title: true,
        imagesId: true,
        target: true,
        progres: true,
        publishTime: true,
        DonasiMaster_Durasi: {
          select: {
            name: true,
          },
        },
        terkumpul: true,
        imageId: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: takeData,
      skip: skipData,
    });

    const totalData = await prisma.donasi.count({
      where: {
        authorId: id,
        donasiMaster_StatusDonasiId: checkStatus.id,
        active: true,
      },
    });

    const totalPages = Math.ceil(totalData / takeData);

    fixData = res.map((v: any) => ({
      ..._.omit(v, ["DonasiMaster_Durasi"]),
      nameDonasiDurasi: v.DonasiMaster_Durasi.name,
    }));

    meta = {
      currentPage: page,
      totalData: totalData,
      totalPage: totalPages,
      dataPerPage: takeData,
    };

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
      ...(meta && { meta }),
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error mendapatkan data",
      reason: (error as Error).message,
    });
  }
}

async function PUT(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  const { id, status } = params;
  const fixStatus = _.startCase(status);

  try {
    const checkStatus = await prisma.donasiMaster_StatusDonasi.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus)
      return NextResponse.json({
        status: 400,
        success: false,
        reason: "Gagal mendapatkan data",
      });

    const res = await prisma.donasi.update({
      where: {
        id: id,
      },
      data: {
        donasiMaster_StatusDonasiId: checkStatus.id,
      },
    });

    if (!res)
      return NextResponse.json({
        status: 400,
        success: false,
        reason: "Gagal mengubah status",
      });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mengubah status",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error mendapatkan data",
      reason: (error as Error).message,
    });
  }
}
