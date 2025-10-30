import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import moment from "moment";

export { POST, GET };

async function POST(request: Request) {
  const { data } = await request.json();
  console.log(["DATA INVESTASI"], data);

  try {
    const create = await prisma.investasi.create({
      data: {
        masterStatusInvestasiId: "2",
        authorId: data.authorId,
        title: _.startCase(data.title),
        targetDana: data.targetDana,
        hargaLembar: data.hargaLembar,
        totalLembar: data.totalLembar,
        sisaLembar: data.totalLembar,
        roi: data.roi,
        masterPencarianInvestorId: data.masterPencarianInvestorId,
        masterPembagianDevidenId: data.masterPembagianDevidenId,
        masterPeriodeDevidenId: data.masterPeriodeDevidenId,
        imageId: data.imageId,
        prospektusFileId: data.prospektusFileId,
      },
    });

    console.log("[CREATE INVESTASI]", create);

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil Membuat Investasi",
    });
  } catch (error) {
    console.log("[ERROR CREATE INVESTASI]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Membuat Investasi ",
      reason: error || (error as Error).message,
    });
  }
}

async function GET(request: Request) {
  let fixData;
  const { searchParams } = new URL(request.url);

  try {
    const data = await prisma.investasi.findMany({
      where: {
        masterStatusInvestasiId: "1",
        masterProgresInvestasiId: "1",
      },
      select: {
        id: true,
        MasterPencarianInvestor: true,
        countDown: true,
        progress: true,
      },
    });

    for (let a of data) {
      if (
        (a.MasterPencarianInvestor?.name as any) -
          moment(new Date()).diff(new Date(a.countDown as any), "days") <=
        0
      ) {
        await prisma.investasi.update({
          where: {
            id: a.id,
          },
          data: {
            masterProgresInvestasiId: "3",
          },
        });
      }

       if (a.progress === "100") {
         await prisma.investasi.update({
           where: {
             id: a.id,
           },
           data: {
             masterProgresInvestasiId: "2",
           },
         });
       }
    }

    const dataAwal = await prisma.investasi.findMany({
      orderBy: [
        {
          masterProgresInvestasiId: "asc",
        },
        {
          countDown: "desc",
        },
      ],
      where: {
        masterStatusInvestasiId: "1",
      },
      select: {
        id: true,
        imageId: true,
        title: true,
        progress: true,
        countDown: true,
        MasterPencarianInvestor: {
          select: {
            name: true,
          },
        },
      },
    });

    fixData = dataAwal.map((v: any) => ({
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
