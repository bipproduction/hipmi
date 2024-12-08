import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";
import fs from "fs";



// GET ONE DATA PORTOFOLIO BY ID PORTOFOLIO
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      let dataFix
      const { id } = context.params;
      const { searchParams } = new URL(request.url);
      const kategori = searchParams.get('cat');

      if (kategori == "bisnis") {
         const data = await prisma.portofolio.findUnique({
            where: {
               id: id,
            },
            select: {
               id_Portofolio: true,
               namaBisnis: true,
               alamatKantor: true,
               tlpn: true,
               deskripsi: true,
               logoId: true,
               MasterBidangBisnis: {
                  select: {
                     name: true
                  }
               },
               Profile: {
                  select: {
                     userId: true
                  }
               }
            }
         });

         dataFix = {
            id_Portofolio: data?.id_Portofolio,
            namaBisnis: data?.namaBisnis,
            alamatKantor: data?.alamatKantor,
            tlpn: data?.tlpn,
            deskripsi: data?.deskripsi,
            logoId: data?.logoId,
            bidangBisnis: data?.MasterBidangBisnis?.name,
            authorId: data?.Profile?.userId
         }

      } else if (kategori == "lokasi") {
         const data = await prisma.portofolio.findUnique({
            where: {
               id: id,
            },
            select: {
               logoId: true,
               BusinessMaps: {
                  select: {
                     id: true,
                     namePin: true,
                     latitude: true,
                     longitude: true,
                     imageId: true,
                     pinId: true
                  }
               }
            }
         });

         dataFix = {
            mapId: data?.BusinessMaps?.id,
            logoId: data?.logoId,
            namePin: data?.BusinessMaps?.namePin,
            latitude: data?.BusinessMaps?.latitude,
            longitude: data?.BusinessMaps?.longitude,
            imageId: data?.BusinessMaps?.imageId,
            pinId: data?.BusinessMaps?.pinId
         }

      } else if (kategori == "sosmed") {
         const data = await prisma.portofolio.findUnique({
            where: {
               id: id,
            },
            select: {
               Portofolio_MediaSosial: {
                  select: {
                     facebook: true,
                     twitter: true,
                     instagram: true,
                     tiktok: true,
                     youtube: true
                  }
               }
            }
         });

         dataFix = {
            facebook: data?.Portofolio_MediaSosial?.facebook,
            twitter: data?.Portofolio_MediaSosial?.twitter,
            instagram: data?.Portofolio_MediaSosial?.instagram,
            tiktok: data?.Portofolio_MediaSosial?.tiktok,
            youtube: data?.Portofolio_MediaSosial?.youtube
         }
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: dataFix }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}

// DELETE ONE DATA PORTOFOLIO
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params

      const data = await prisma.portofolio.findUnique({
         where: {
            id: id
         }
      })

      const findLogo = await prisma.images.findFirst({
         where: {
            id: String(data?.logoId),
         },
         select: {
            id: true,
            url: true,
         },
      });

      if (findLogo) {
         fs.unlinkSync(`./public/portofolio/logo/${findLogo.url}`)
         const deleteLogo = await prisma.images.delete({
            where: {
               id: String(findLogo?.id),
            },
         });
      }



      const deletePortoMedsos = await prisma.portofolio_MediaSosial.delete({
         where: {
            portofolioId: id,
         },
      });

      const deleteMap = await prisma.businessMaps.delete({
         where: {
            portofolioId: id
         }
      })

      const deletePortofolio = await prisma.portofolio.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json({ success: true, message: "Berhasil menghapus data" }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menghapus data, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}