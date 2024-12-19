import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ALL DATA MASTER UNTUK DONASI
export async function GET(request: Request) {
   try {
      let dataFix
      const { searchParams } = new URL(request.url)
      const kategori = searchParams.get("cat")

      if (kategori == "kategori") {
         dataFix = await prisma.donasiMaster_Kategori.findMany({
            orderBy: {
               createdAt: "asc",
            },
            where: {
               active: true,
            }
         })
      } else if (kategori == "durasi") {
         dataFix = await prisma.donasiMaster_Durasi.findMany()
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}