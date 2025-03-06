import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    let fixData;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 10
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.investasi_Invoice.findMany({
        where: {
          investasiId: id,
          StatusInvoice: {
            name: "Berhasil",
          },
        },
        include: {
          Author: {
            select: {
              Profile: true,
            },
          },
        },
      });
    } else {
      const Alldata = await prisma.investasi_Invoice.findMany({
        skip: skipData,
        take: takeData,
        where: {
          investasiId: id,
          StatusInvoice: {
            name: "Berhasil",
          },
        },
        include: {
          Author: {
            select: {
              Profile: true,
            },
          },
        },
      });

      fixData = Alldata.map((e, i) => ({
        ..._.omit(e, ["Author"]),
        Profile: e.Author?.Profile,
      }));
    }

    return NextResponse.json({
      success: true,
      message: "Success get data investor",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get data investor >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data investor",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
