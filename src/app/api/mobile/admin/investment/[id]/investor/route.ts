import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const status = searchParams.get("status");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    const fixStatus = _.startCase(status ? status : "");

    const checkStatus = await prisma.investasiMaster_StatusInvoice.findFirst({
      where: {
        name: fixStatus,
      },
    });

    const data = await prisma.investasi_Invoice.findMany({
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        investasiId: id,
        isActive: true,
        StatusInvoice: {
          name: {
            contains: checkStatus?.name,
            mode: "insensitive",
          },
        },
      },
      select: {
        id: true,
        Author: true,
        StatusInvoice: true,
      },
    });

    fixData = data;

    return NextResponse.json(
      {
        success: true,
        message: "Success get status transaksi",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Eror get status transaksi", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get status transaksi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
