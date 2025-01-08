import { DIRECTORY_ID, prisma } from "@/app/lib";
import { NextResponse } from "next/server";
import fs from "fs";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import { apiDeleteImageById } from "@/app_modules/_global/lib/api_image";
import backendLogger from "@/util/backendLogger";
export const dynamic = "force-dynamic";

// GET ONE DATA PORTOFOLIO BY ID PORTOFOLIO
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    let dataFix;
    const { id } = context.params;
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("cat");

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
              name: true,
            },
          },
          Profile: {
            select: {
              userId: true,
            },
          },
        },
      });

      dataFix = {
        id_Portofolio: data?.id_Portofolio,
        namaBisnis: data?.namaBisnis,
        alamatKantor: data?.alamatKantor,
        tlpn: data?.tlpn,
        deskripsi: data?.deskripsi,
        logoId: data?.logoId,
        bidangBisnis: data?.MasterBidangBisnis?.name,
        authorId: data?.Profile?.userId,
      };
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
              pinId: true,
            },
          },
        },
      });

      dataFix = {
        mapId: data?.BusinessMaps?.id,
        logoId: data?.logoId,
        namePin: data?.BusinessMaps?.namePin,
        latitude: data?.BusinessMaps?.latitude,
        longitude: data?.BusinessMaps?.longitude,
        imageId: data?.BusinessMaps?.imageId,
        pinId: data?.BusinessMaps?.pinId,
      };
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
              youtube: true,
            },
          },
        },
      });

      dataFix = {
        facebook: data?.Portofolio_MediaSosial?.facebook,
        twitter: data?.Portofolio_MediaSosial?.twitter,
        instagram: data?.Portofolio_MediaSosial?.instagram,
        tiktok: data?.Portofolio_MediaSosial?.tiktok,
        youtube: data?.Portofolio_MediaSosial?.youtube,
      };
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: dataFix },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data, coba lagi nanti (error: 500)",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE ONE DATA PORTOFOLIO
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const data = await prisma.portofolio.findUnique({
      where: {
        id: id,
      },
      include: {
        BusinessMaps: {
          select: {
            pinId: true,
            imageId: true,
          },
        },
      },
    });

    try {
      const id = data?.logoId;
      const deleteLogo = await fetch(
        `https://wibu-storage.wibudev.com/api/files/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.WS_APIKEY}`,
          },
        }
      );

      if (deleteLogo.ok) {
        backendLogger.info(`Success delete logo`);
      }

      if (data?.BusinessMaps?.pinId != null) {
        const pinId = data?.BusinessMaps?.pinId;
        const deletePin = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${pinId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deletePin.ok) {
          backendLogger.info(`Success delete pin`);
        }

        const imageId = data?.BusinessMaps?.imageId;
        const deleteImage = await fetch(
          `https://wibu-storage.wibudev.com/api/files/${imageId}/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.WS_APIKEY}`,
            },
          }
        );

        if (deleteImage.ok) {
          backendLogger.info(`Success delete image`);
        }
      }
    } catch (error) {
      backendLogger.error("Error delete logo", error);
    }

    const deletePortoMedsos = await prisma.portofolio_MediaSosial.delete({
      where: {
        portofolioId: id,
      },
    });

    const deleteMap = await prisma.businessMaps.delete({
      where: {
        portofolioId: id,
      },
    });

    const deletePortofolio = await prisma.portofolio.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil menghapus data" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data, coba lagi nanti (error: 500)",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
