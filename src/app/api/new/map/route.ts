import { prisma } from "@/app/lib";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ALL DATA MAP
export async function GET(request: Request) {
   try {
      const data = await prisma.businessMaps.findMany({
         where: {
            isActive: true,
         },
         select: {
            id: true,
            namePin: true,
            latitude: true,
            longitude: true,
            pinId: true,
            Portofolio: {
               select: {
                  logoId: true,
               }
            }
         }
      });

      const dataFix = data.map((v: any) => ({
         ..._.omit(v, ["Portofolio"]),
         logoId: v.Portofolio.logoId
      }))

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}