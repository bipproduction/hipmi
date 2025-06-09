import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.donasi_Invoice.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        authorId: true,
        nominal: true,
        donasiId: true,
        createdAt: true,
        donasiMaster_BankId: true,
        donasiMaster_StatusInvoiceId: true,
        Donasi: {
          select: {
            id: true,
            title: true,
            target: true,
            active: true,
            createdAt: true,
            updatedAt: true,
            publishTime: true,
            catatan: true,
            progres: true,
            terkumpul: true,
            authorId: true,
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
        DonasiMaster_Bank: true,
        DonasiMaster_StatusInvoice: true,
      },
    });

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      reason: (error as Error).message || error,
    });
  }
}