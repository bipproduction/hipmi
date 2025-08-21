import backendLogger from "@/util/backendLogger";
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
    const takeData = 10
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.investasi_Invoice.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          investasiId: id,
          isActive: true,
        },
        include: {
          Author: true,
          Images: true,
          StatusInvoice: true,
          MasterBank: true,
        },
      });
    } else {
      const fixStatus = _.startCase(status ? status : "");

      const data = await prisma.investasi_Invoice.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          investasiId: id,
          isActive: true,
          StatusInvoice: {
            name: {
              contains: fixStatus,
              mode: "insensitive",
            },
          },
        },
        include: {
          Author: true,
          Images: true,
          StatusInvoice: true,
          MasterBank: true,
        },
      });
      const nCount = await prisma.investasi_Invoice.count({
        where: {
          investasiId: id,
          isActive: true,
          StatusInvoice: {
            name: {
              contains: fixStatus,
              mode: "insensitive",
            },
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get status transaksi",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Eror get status transaksi", error);
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
