import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET DATA HOME
export async function GET(request: Request) {
   try {
      let fixData
      const { searchParams } = new URL(request.url)
      const kategori = searchParams.get("cat")

      const userLoginId = await funGetUserIdByToken()
      if (userLoginId == null) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan data, user id tidak ada" }, { status: 500 });
      }

      if (kategori == "job") {
         fixData = await prisma.job.findMany({
            take: 2,
            orderBy: {
               createdAt: "desc",
            },
            where: {
               isActive: true,
               masterStatusId: "1"
            },
            select: {
               id: true,
               Author: {
                  select: {
                     id: true,
                     username: true,
                  },
               },
               title: true,
               deskripsi: true
            },
         });
      } else if (kategori == "cek_profile") {
         const data = await prisma.user.findUnique({
            where: {
               id: userLoginId,
            },
            select: {
               Profile: {
                  select: {
                     id: true,
                     imageId: true,
                  }
               }
            }
         });

         fixData = {
            profile: data?.Profile?.id,
            imageId: data?.Profile?.imageId
         }

      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: fixData }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}