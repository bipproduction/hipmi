import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST, GET, PUT };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  console.log("[ID]", id);
  console.log("[DATA]", data);

  try {
    const create = await prisma.donasi_Invoice.create({
      data: {
        donasiId: id,
        nominal: data.nominal,
        donasiMaster_BankId: data.bankId,
        authorId: data.authorId,
      },
      select: {
        id: true,
        DonasiMaster_StatusInvoice: {
          select: {
            name: true,
          },
        },
        Donasi: {
          select: {
            id: true,
            title: true,
            authorId: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil membuat invoice",
      data: create,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal membuat invoice",
      reason: (error as Error).message,
    });
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.donasi_Invoice.findUnique({
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

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);

  console.log("[ID]", id);
  console.log("[DATA]", data);
  console.log("[STATUS]", fixStatus);

  try {
    const checkStatus = await prisma.donasiMaster_StatusInvoice.findFirst({
      where: {
        name: fixStatus,
      },
    });

    if (!checkStatus) {
      return NextResponse.json({
        success: false,
        message: "Status tidak ditemukan",
      });
    }
    const update = await prisma.donasi_Invoice.update({
      where: {
        id: id,
      },
      data: {
        donasiMaster_StatusInvoiceId: checkStatus.id,
        imageId: data.fileId,
      },
      select: {
        id: true,
        DonasiMaster_StatusInvoice: {
          select: {
            name: true,
          },
        },
        Donasi: {
          select: {
            id: true,
            title: true,
            authorId: true,
          },
        },
      },
    });

    console.log("[UPDATE]", update);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan saat memperbarui data",
      reason: (error as Error).message || error,
    });
  }
}
