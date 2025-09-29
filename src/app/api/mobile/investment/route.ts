import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST };
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

