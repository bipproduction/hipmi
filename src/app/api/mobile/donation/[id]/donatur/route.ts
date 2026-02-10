import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";
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
    const page = Number(searchParams.get("page")) || 1; // Default page 1 jika tidak ada atau invalid
    const takeData = PAGINATION_DEFAULT_TAKE;
    const skipData = page * takeData - takeData;

    // Query data dengan pagination
    const data = await prisma.donasi_Invoice.findMany({
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

    // Hitung total data untuk pagination
    const totalCount = await prisma.donasi_Invoice.count({
      where: {
        donasiId: id,
        DonasiMaster_StatusInvoice: {
          name: "Berhasil",
        },
      },
    });

    // Hitung total halaman
    const totalPages = Math.ceil(totalCount / takeData);

    fixData = data;

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: fixData,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalData: totalCount,
        dataPerPage: takeData,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      reason: error as Error,
    });
  }
}
