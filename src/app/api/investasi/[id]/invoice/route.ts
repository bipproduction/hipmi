import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const data = await prisma.investasi_Invoice.findFirst({
      where: {
        id: id,
      },
      include: {
        MasterBank: true,
        StatusInvoice: true,
        Investasi: {
          include: {
            MasterPembagianDeviden: true,
            MasterPencarianInvestor: true,
            MasterPeriodeDeviden: true,
            ProspektusInvestasi: true,
            Investasi_Invoice: {
              where: {
                statusInvoiceId: "1",
              },
            },
          },
        },
        Author: {
          include: {
            Profile: true,
          },
        },
      },
    });

    const { ...allData } = data;
    const Investor = data?.Investasi?.Investasi_Invoice;
    const result = { ...allData, Investor };

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data invoice",
      data: result,
    });
  } catch (error) {
    console.error("Error get invoice", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data invoice, coba lagi nanti ",
      reason: (error as Error).message,
    });
  }
}
