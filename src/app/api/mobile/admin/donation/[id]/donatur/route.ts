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

  console.log("[FIX STATUS]", fixStatus);

  let fixData;
  try {
    if (status === null) {
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
          MasterBank: true,
        },
      });
    } else {
      const checkStatusTransaksi =
        await prisma.donasiMaster_StatusInvoice.findFirst({
          where: {
            name: fixStatus,
          },
        });

      console.log("[CHECK STATUS TRANSAKSI]", checkStatusTransaksi);

      if (!checkStatusTransaksi)
        return NextResponse.json(
          {
            success: false,
            message: "Error get detail Investasi",
            reason: "Status not found",
          },
          { status: 500 }
        );

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
              contains: checkStatusTransaksi.name,
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
