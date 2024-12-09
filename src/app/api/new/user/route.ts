import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET ONE DATA USER PROFILE BY PROFILE ID
export async function GET(request: Request) {
   try {
      const { searchParams } = new URL(request.url)
      const profile = searchParams.get("profile")

      const data = await prisma.profile.findUnique({
         where: {
            id: String(profile),
         },
         select: {
            id: true,
            name: true,
            email: true,
            alamat: true,
            jenisKelamin: true,
            imageId: true,
            imageBackgroundId: true,
            userId: true,
            User: {
               select: {
                  username: true,
                  nomor: true,
                  active: true,
                  masterUserRoleId: true
               }
            }
         }
      });

      const dataFix = {
         id: data?.userId,
         username: data?.User?.username,
         nomor: data?.User?.nomor,
         active: data?.User?.active,
         masterUserRoleId: data?.User?.masterUserRoleId,
         idProfile: data?.id,
         name: data?.name,
         email: data?.email,
         alamat: data?.alamat,
         jenisKelamin: data?.jenisKelamin,
         imageId: data?.imageId,
         imageBackgroundId: data?.imageBackgroundId

      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix, }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}