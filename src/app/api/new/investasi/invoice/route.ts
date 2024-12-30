import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";



// GET ALL DATA INVESTASI SAYA (INVOICE)
export async function GET(request: Request) {
   try {
      let dataFix
      const { searchParams } = new URL(request.url)
      const page = searchParams.get("page")
      const dataSkip = Number(page) * 10 - 10;
      const kategori = searchParams.get("cat")


      const userLoginId = await funGetUserIdByToken()
      if (userLoginId == null) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan data, user id tidak ada" }, { status: 500 });
      }

      if (kategori == "saham-saya") {
         const data = await prisma.investasi_Invoice.findMany({
            take: 10,
            skip: dataSkip,
            orderBy: {
               updatedAt: "desc",
            },
            where: {
               authorId: userLoginId,
               statusInvoiceId: "1",
               isActive: true,
            },
            select: {
               id: true,
               nominal: true,
               lembarTerbeli: true,
               Investasi: {
                  select: {
                     title: true,
                     progress: true
                  }
               }
            }
         });

         dataFix = data.map((v: any) => ({
            ..._.omit(v, ["Investasi"]),
            title: v.Investasi.title,
            progress: v.Investasi.progress
         }))

      } else if (kategori == "transaksi") {
         const data = await prisma.investasi_Invoice.findMany({
            take: 10,
            skip: dataSkip,
            orderBy: {
               updatedAt: "desc",
            },
            where: {
               authorId: userLoginId,
            },
            select: {
               id: true,
               statusInvoiceId: true,
               nominal: true,
               createdAt: true,
               StatusInvoice: {
                  select: {
                     name: true
                  }
               },
               Investasi: {
                  select: {
                     title: true
                  }
               }
            }
         });


         dataFix = data.map((v: any) => ({
            ..._.omit(v, ["Investasi", "StatusInvoice"]),
            title: v.Investasi.title,
            statusInvoice: v.StatusInvoice.name
         }))
      }


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}