import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const takeData = 10;
    const skipData = page * takeData - takeData;

    fixData = await prisma.donasi_Invoice.findMany({
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        donasiId: id,
        DonasiMaster_StatusInvoice: {
          name: "Berhasil",
        },
      },
      select: {
        id: true,
        Author: {
          select: {
            id: true,
            username: true,
          },
        },
        nominal: true,
        createdAt: true,
        // updatedAt: true,
        // DonasiMaster_StatusInvoice: true,
        // donasiMaster_StatusInvoiceId: true,
        // Donasi: {
        //   select: {
        //     id: true,
        //     title: true,
        //     target: true,
        //     progres: true,
        //     authorId: true,
        //     imagesId: true,
        //     publishTime: true,
        //     donasiMaster_KategoriId: true,
        //     donasiMaster_DurasiId: true,
        //     donasiMaster_StatusDonasiId: true,
        //     imageDonasi: true,
        //     DonasiMaster_Ketegori: true,
        //     DonasiMaster_Durasi: true,
        //     DonasiMaster_Status: true,
        //   },
        // },
      },
    });

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
