import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";

export { POST, GET, PUT };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    const create = await prisma.donasi_Invoice.create({
      data: {
        donasiId: id,
        nominal: data.nominal,
        masterBankId: data.bankId,
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

    if (!create) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Gagal membuat invoice",
      });
    }

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
        MasterBank: true,
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

    const updated = await prisma.donasi_Invoice.update({
      where: {
        id: id,
      },
      data: {
        donasiMaster_StatusInvoiceId: checkStatus.id,
        imageId: data || null,
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

    if (!updated) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Gagal memperbarui data",
      });
    }

    const findUsers = await prisma.user.findMany({
      where: {
        masterUserRoleId: "2",
        active: true,
        NOT: { id: updated?.Donasi?.authorId as string },
      },
      select: { id: true },
    });

    // SEND NOTIFICATION
    await sendNotificationMobileToManyUser({
      recipientIds: findUsers.map((user) => user.id),
      senderId: data.authorId,
      payload: {
        title: "Ada Donasi Baru !" as NotificationMobileTitleType,
        body: `Cek data investor pada ${updated?.Donasi?.title}` as NotificationMobileBodyType,
        type: "announcement",
        kategoriApp: "DONASI",
        deepLink: routeAdminMobile.donationDetailPublish({
          id: updated?.Donasi?.id as string,
          status: "publish",
        }),
      },
    });

    console.log("[UPDATE INVOICE]", updated);

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
