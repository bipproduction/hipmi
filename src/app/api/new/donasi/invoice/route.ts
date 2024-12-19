import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";




// GET ALL DATA DONASI SAYA (INVOICE)
export async function GET(request: Request) {
   try {
      const { searchParams } = new URL(request.url)
      const page = searchParams.get("page")
      const dataSkip = Number(page) * 5 - 5;


      const userLoginId = await funGetUserIdByToken()
      if (userLoginId == null) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan data, user id tidak ada" }, { status: 500 });
      }

      const data = await prisma.donasi_Invoice.findMany({
         take: 5,
         skip: dataSkip,
         orderBy: {
            createdAt: "desc",
         },
         where: {
            authorId: userLoginId,
         },
         select: {
            id: true,
            nominal: true,
            donasiMaster_StatusInvoiceId: true,
            DonasiMaster_StatusInvoice: {
               select: {
                  name: true
               }
            },
            Donasi: {
               select: {
                  id: true,
                  title: true,
                  publishTime: true,
                  progres: true,
                  imageId: true,
                  DonasiMaster_Durasi: {
                     select: {
                        name: true
                     }
                  },
               },
            },
         },
      });

      const dataFix = data.map((v: any) => ({
         ..._.omit(v, ["DonasiMaster_StatusInvoice", "Donasi"]),
         nameStatusInvoice: v.DonasiMaster_StatusInvoice.name,
         donasiId: v.Donasi.id,
         title: v.Donasi.title,
         publishTime: v.Donasi.publishTime,
         progres: v.Donasi.progres,
         imageId: v.Donasi.imageId,
         durasiDonasi: v.Donasi.DonasiMaster_Durasi.name
      }))


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}