import { prisma } from "@/lib";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log("id server", id);
    const data = await prisma.donasi_Invoice.findUnique({
      where: {
        id: id,
      },
      select: {
        // DonasiMaster_Status: true,
        DonasiMaster_StatusInvoice: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil di check transaksis donasi",
      statusTransaksi: _.lowerCase(data?.DonasiMaster_StatusInvoice?.name),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal di check transaksis donasi",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
