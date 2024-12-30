import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ALL DATA DONASI
export async function GET(request: Request) {
   try {
      let dataFix
      const { searchParams } = new URL(request.url)
      const kategori = searchParams.get("cat")
      const status = searchParams.get("status")
      const page = searchParams.get("page")
      const dataSkip = Number(page) * 5 - 5;

      if (kategori == "beranda") {
         const data = await prisma.donasi.findMany({
            take: 5,
            skip: dataSkip,
            orderBy: {
               publishTime: "desc",
            },
            where: {
               donasiMaster_StatusDonasiId: "1",
               active: true,
            },
            select: {
               id: true,
               imageId: true,
               title: true,
               publishTime: true,
               progres: true,
               terkumpul: true,
               DonasiMaster_Durasi: {
                  select: {
                     name: true
                  }
               },

            }
         });

         dataFix = data.map((v: any) => ({
            ..._.omit(v, ["DonasiMaster_Durasi"]),
            nameDonasiDurasi: v.DonasiMaster_Durasi.name
         }))
      } else if (kategori == "galang-dana") {
         const userLoginId = await funGetUserIdByToken()
         if (userLoginId == null) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan data, user id tidak ada" }, { status: 500 });
         }

         const data = await prisma.donasi.findMany({
            take: 5,
            skip: dataSkip,
            where: {
               authorId: userLoginId,
               donasiMaster_StatusDonasiId: status,
               active: true,
            },
            select: {
               id: true,
               title: true,
               imagesId: true,
               target: true,
               progres: true,
               publishTime: true,
               DonasiMaster_Durasi: {
                  select: {
                     name: true
                  }
               },
               terkumpul: true,
               imageId: true,
            },
            orderBy: {
               updatedAt: "desc",
            },
         });

         dataFix = data.map((v: any) => ({
            ..._.omit(v, ["DonasiMaster_Durasi"]),
            nameDonasiDurasi: v.DonasiMaster_Durasi.name
         }))
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}