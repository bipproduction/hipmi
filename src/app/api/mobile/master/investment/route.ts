import { prisma } from "@/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET ALL DATA MASTER UNTUK INVESTASI
export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (category === "pencarian-investor") {
      fixData = await prisma.masterPencarianInvestor.findMany({
        select: {
          id: true,
          name: true,
          active: true,
        },
      });
    } else if (category === "periode-deviden") {
      fixData = await prisma.masterPeriodeDeviden.findMany({
        select: {
          id: true,
          name: true,
          active: true,
        },
      });
    } else if (category === "pembagian-deviden") {
      fixData = await prisma.masterPembagianDeviden.findMany({
        select: {
          id: true,
          name: true,
          active: true,
        },
      });
    } else {
      const pencarianInvestor = await prisma.masterPencarianInvestor.findMany({
        select: {
          id: true,
          name: true,
          active: true,
        },
      });

      const periodeDeviden = await prisma.masterPeriodeDeviden.findMany({
        select: {
          id: true,
          name: true,
          active: true,
        },
      });

      const pembagianDeviden = await prisma.masterPembagianDeviden.findMany({
        select: {
          id: true,
          name: true,
          active: true,
        },
      });

      fixData = {
        pencarianInvestor,
        periodeDeviden,
        pembagianDeviden,
      };
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
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
