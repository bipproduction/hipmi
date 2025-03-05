import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.investasi_Invoice.findFirst({
      where: {
        id: id,
      },
      include: {
        MasterBank: true,
        StatusInvoice: {
            where: {
                name: "Berhasil",
            }
        },
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
      message: "Berhasil mengambil data",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
