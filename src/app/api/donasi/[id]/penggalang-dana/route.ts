import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.user.findFirst({
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
        Donasi: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            donasiMaster_StatusDonasiId: "1",
          },
          select: {
            id: true,
            title: true,
            target: true,
            active: true,
            createdAt: true,
            updatedAt: true,
            publishTime: true,
            catatan: true,
            authorId: true,
            progres: true,
            terkumpul: true,
            imagesId: true,
            donasiMaster_KategoriId: true,
            donasiMaster_DurasiId: true,
            donasiMaster_StatusDonasiId: true,
            Author: true,
            imageDonasi: true,
            CeritaDonasi: true,
            DonasiMaster_Ketegori: true,
            DonasiMaster_Durasi: true,
            DonasiMaster_Status: true,
            imageId: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      reason: error as Error,
    });
  }
}
