import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ONE DATA DONASI
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params
      const data = await prisma.donasi.findFirst({
         where: {
            id: id
         },
         include: {
            Author: true,
            imageDonasi: true,
            CeritaDonasi: true,
            DonasiMaster_Ketegori: true,
            DonasiMaster_Durasi: true,
            DonasiMaster_Status: true,
            Donasi_Invoice: true,
            Donasi_Kabar: true,
            Donasi_PencairanDana: true,
         },
      });

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}