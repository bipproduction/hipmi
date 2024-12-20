import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ONE DATA DONASI
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      let dataFix
      const { id } = context.params
      const { searchParams } = new URL(request.url)
      const kategori = searchParams.get("cat")

      if (kategori == "semua") {
         dataFix = await prisma.donasi.findFirst({
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

      } else if (kategori == "count") {
         dataFix = await prisma.donasi_Invoice.count({
            where: {
               donasiId: id,
               donasiMaster_StatusInvoiceId: {
                  equals: "1"
               }
            }
         });

      } else {
         let tampil
         if (kategori == "author") {
            tampil = {
               authorId: true,
               Author: {
                  select: {
                     username: true
                  }
               }
            }
         } else if (kategori == "cerita") {
            tampil = {
               id: true,
               createdAt: true,
               CeritaDonasi: {
                  select: {
                     cerita: true
                  }
               }
            }
         }

         dataFix = await prisma.donasi.findFirst({
            where: {
               id: id
            },
            select: tampil
         })
      }


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}