import {
  sendNotificationMobileToManyUser,
  sendNotificationMobileToOneUser,
} from "@/lib/mobile/notification/send-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";
import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const donasiId = id;
    const data = await prisma.donasi.findUnique({
      where: {
        id: donasiId,
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
        progres: true,
        terkumpul: true,
        authorId: true,
        namaBank: true,
        rekening: true,
        totalPencairan: true,
        akumulasiPencairan: true,
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
    });

    const successInvoice = await prisma.donasi_Invoice.count({
      where: {
        donasiId: donasiId,
        DonasiMaster_StatusInvoice: {
          name: "Berhasil",
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data Donasi Berhasil Diambil",
        data: {
          donasi: data,
          donatur: successInvoice,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { catatan, senderId } = data;
  console.log("[PUT CATATAN]", catatan);
  console.log("[PUT SENDER ID]", senderId);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const fixStatus = _.startCase(status as string);

  console.log("[PUT ID]", id);
  console.log("[PUT DATA DONASI]", data);
  console.log("[PUT DATA DONASI]", fixStatus);

  let fixData;
  try {
    const checkStatus = await prisma.donasiMaster_StatusDonasi.findFirst({
      where: {
        name: fixStatus,
      },
    });

    console.log("[PUT CHECK STATUS]", checkStatus);

    if (!checkStatus)
      return NextResponse.json(
        {
          success: false,
          message: "Error update data event",
          reason: "Status not found",
        },
        { status: 500 },
      );

    if (fixStatus === "Reject") {
      const updateData = await prisma.donasi.update({
        where: {
          id: id,
        },
        data: {
          catatan: catatan,
          donasiMaster_StatusDonasiId: checkStatus.id,
        },
      });

      // SEND NOTIFICATION
      await sendNotificationMobileToOneUser({
        recipientId: updateData.authorId as any,
        senderId: senderId,
        payload: {
          title: "Pengajuan Review Ditolak",
          body: "Mohon perbaiki data sesuai catatan penolakan !",
          type: "announcement",
          kategoriApp: "DONASI",
          deepLink: routeUserMobile.donationByStatus({ status: "reject" }),
        },
      });

      fixData = updateData;
    } else if (fixStatus === "Publish") {
      const updateData = await prisma.donasi.update({
        where: {
          id: id,
        },
        data: {
          donasiMaster_StatusDonasiId: checkStatus.id,
          publishTime: new Date(),
        },
      });

      // SEND NOTIFICAtION
      await sendNotificationMobileToOneUser({
        recipientId: updateData.authorId as any,
        senderId: senderId,
        payload: {
          title: "Review Selesai",
          body: `Donasi kamu telah dipublikasikan ! ${updateData.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "DONASI",
          deepLink: routeUserMobile.donationByStatus({ status: "publish" }),
        },
      });

      const allUsers = await prisma.user.findMany({
        where: {
          NOT: { id: updateData.authorId as any },
          active: true,
        },
        select: { id: true },
      });

      await sendNotificationMobileToManyUser({
        recipientIds: allUsers.map((user) => user.id),
        senderId: senderId,
        payload: {
          title: "Ayo Cek Donasi Terbaru" as NotificationMobileTitleType,
          body: `${updateData.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "DONASI",
          deepLink: routeUserMobile.donationDetailPublish({ id: id }),
        },
      });

      fixData = updateData;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Data Donasi Berhasil Diambil",
        data: data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
