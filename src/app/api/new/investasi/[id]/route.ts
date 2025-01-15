import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET ONE DATA INVESTASI BY ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const data = await prisma.investasi.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          include: {
            Profile: true,
          },
        },
        Investasi_Invoice: true,
        MasterStatusInvestasi: true,
        BeritaInvestasi: true,
        DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        MasterProgresInvestasi: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data, coba lagi nanti ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
