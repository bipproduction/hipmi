import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";


// GET  ALL DATA PORTOFOLIO BY PROFILE ID
export async function GET(request: Request) {
   try {
      let fixData
      const { searchParams } = new URL(request.url)
      const profile = searchParams.get("profile")
      const kategori_halaman = searchParams.get("cat")
      const page = searchParams.get("page")
      const dataSkip = Number(page) * 10 - 10;

      if (kategori_halaman == "profile") {
         fixData = await prisma.portofolio.findMany({
            take: 2,
            orderBy: {
               createdAt: "desc",
            },
            where: {
               profileId: profile,
               active: true,
            },
            select: {
               id: true,
               id_Portofolio: true,
               namaBisnis: true,
               profileId: true,
            },
         });
      } else if (kategori_halaman == "portofolio") {
         fixData = await prisma.portofolio.findMany({
            skip: dataSkip,
            take: 10,
            orderBy: {
               createdAt: "desc",
            },
            where: {
               profileId: profile,
               active: true,
            },
            select: {
               id: true,
               id_Portofolio: true,
               namaBisnis: true,
               profileId: true,
            },
         });
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: fixData }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}