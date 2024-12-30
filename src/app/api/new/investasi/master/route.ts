import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ALL DATA MASTER UNTUK INVESTASI
export async function GET(request: Request) {
   try {
      let dataFix
      const { searchParams } = new URL(request.url)
      const kategori = searchParams.get("cat")

      if (kategori == "pencarian-investor") {
         dataFix = await await prisma.masterPencarianInvestor.findMany({
            select: {
               id: true,
               name: true,
               active: true,
            },
         });
      } else if (kategori == "periode-deviden") {
         dataFix = await prisma.masterPeriodeDeviden.findMany({
            select: {
               id: true,
               name: true,
               active: true,
            },
         });
      } else if (kategori == "pembagian-deviden") {
         dataFix = await prisma.masterPembagianDeviden.findMany({
            select: {
               id: true,
               name: true,
               active: true,
            },
         });
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}