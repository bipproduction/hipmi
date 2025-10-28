import _ from "lodash";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;
  const fixStatus = _.startCase(status || "");

  let fixData;
  try {
    if (fixStatus) {
      const data = await prisma.donasi_Invoice.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          donasiId: id,
          active: true,
          DonasiMaster_StatusInvoice: {
            name: {
              contains: fixStatus,
              mode: "insensitive",
            },
          },
        },
        select: {
          id: true,
          nominal: true,
          createdAt: true,
          Author: true,
          DonasiMaster_Bank: true,
          DonasiMaster_StatusInvoice: true,
          donasiMaster_StatusInvoiceId: true,
          imagesId: true,
          imageId: true,
        },
      });

      fixData = data;
    } else {
      fixData = await prisma.donasi_Invoice.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          donasiId: id,
          active: true,
        },
        select: {
          id: true,
          nominal: true,
          createdAt: true,
          Author: true,
          DonasiMaster_Bank: true,
          DonasiMaster_StatusInvoice: true,
          donasiMaster_StatusInvoiceId: true,
          imagesId: true,
          imageId: true,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
