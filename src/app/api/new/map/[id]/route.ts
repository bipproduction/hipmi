import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params
      const data = await prisma.businessMaps.findUnique({
         where: {
            id: id,
         },
         select: {
            namePin: true,
            latitude: true,
            longitude: true,
            pinId: true,
            imageId: true,
            Author: {
               select: {
                  Profile: {
                     select: {
                        id: true,
                        name: true,
                        imageId: true,
                     }
                  }
               }
            },
            Portofolio: {
               select: {
                  id: true,
                  alamatKantor: true,
                  tlpn: true,
                  deskripsi: true,
                  namaBisnis: true,
                  MasterBidangBisnis: {
                     select: {
                        name: true,
                     },
                  },
               },
            },
         }
      });

      const dataLokasi = {
         namePin: data?.namePin,
         latitude: data?.latitude,
         longitude: data?.longitude,
         pinId: data?.pinId,
         imageId: data?.imageId,
      }

      const dataAuthor = {
         id: data?.Author?.Profile?.id,
         name: data?.Author?.Profile?.name,
         imageId: data?.Author?.Profile?.imageId,
      }

      const dataBisnis = {
         id: data?.Portofolio?.id,
         alamatKantor: data?.Portofolio?.alamatKantor,
         tlpn: data?.Portofolio?.tlpn,
         deskripsi: data?.Portofolio?.deskripsi,
         namaBisnis: data?.Portofolio?.namaBisnis,
         bidangBisnis: data?.Portofolio?.MasterBidangBisnis?.name,
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", dataLokasi, dataAuthor, dataBisnis }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti ", reason: (error as Error).message, }, { status: 500 });
   }
}