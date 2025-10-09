import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let fixData;
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        nomor: true,
        Profile: {
          select: {
            id: true,
            name: true,
            email: true,
            imageId: true,
          },
        },
        // Donasi: {
        //   orderBy: {
        //     createdAt: "desc",
        //   },
        //   where: {
        //     donasiMaster_StatusDonasiId: "1",
        //   },
        //   select: {
        //     id: true,
        //     title: true,
        //     target: true,
        //     active: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     publishTime: true,
        //     catatan: true,
        //     authorId: true,
        //     progres: true,
        //     terkumpul: true,
        //     imagesId: true,
        //     donasiMaster_KategoriId: true,
        //     donasiMaster_DurasiId: true,
        //     donasiMaster_StatusDonasiId: true,
        //     Author: true,
        //     imageDonasi: true,
        //     CeritaDonasi: true,
        //     DonasiMaster_Ketegori: true,
        //     DonasiMaster_Durasi: true,
        //     DonasiMaster_Status: true,
        //     imageId: true,
        //   },
        // },
      },
    });

    const donasi = await prisma.donasi.findMany({
      where: {
        authorId: id,
        donasiMaster_StatusDonasiId: "1",
        active: true,
      },
      orderBy: {
        publishTime: "desc",
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
            name: true,
          },
        },
      },
    });

    fixData = {
      user,
      donasi,
    };

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      reason: error as Error,
    });
  }
}
