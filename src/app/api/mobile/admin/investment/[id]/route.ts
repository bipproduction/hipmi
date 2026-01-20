import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import {
  sendNotificationMobileToManyUser,
  sendNotificationMobileToOneUser,
} from "@/lib/mobile/notification/send-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.investasi.findUnique({
      where: {
        id: id,
      },
      select: {
        imageId: true,
        prospektusFileId: true,
        id: true,
        author: {
          select: {
            id: true,
            username: true,
            nomor: true,
            Profile: true,
          },
        },
        title: true,
        authorId: true,
        hargaLembar: true,
        targetDana: true,
        totalLembar: true,
        sisaLembar: true,
        lembarTerbeli: true,
        progress: true,
        roi: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        catatan: true,
        imagesId: true,
        MasterStatusInvestasi: true,
        BeritaInvestasi: true,
        DokumenInvestasi: true,
        ProspektusInvestasi: true,
        MasterPembagianDeviden: true,
        MasterPencarianInvestor: true,
        MasterPeriodeDeviden: true,
        MasterProgresInvestasi: true,
        masterStatusInvestasiId: true,
        countDown: true,
        Investasi_Invoice: {
          where: {
            statusInvoiceId: "2",
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get data investment",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data investment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { catatan, senderId } = data;

  console.log("[DATA]", data);
  console.log("[CATATAN]", catatan);
  console.log("[SENDER ID]", senderId);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  // console.log("[=======Start Investment console=======]");
  // console.log("[ID]", id);
  // console.log("[STATUS]", status);
  // console.log("[=======End Investment console=======]");

  const publishTime = new Date();

  try {
    if (status === "reject") {
      const updatedData = await prisma.investasi.update({
        where: {
          id: id,
        },
        data: {
          catatan: catatan,
          masterStatusInvestasiId: "4",
        },
        select: {
          authorId: true,
          title: true,
        },
      });

      // SEND NOTIFICATION
      await sendNotificationMobileToOneUser({
        recipientId: updatedData.authorId as any,
        senderId: senderId,
        payload: {
          title: "Pengajuan Review Ditolak",
          body: "Mohon perbaiki data sesuai catatan penolakan !",
          type: "announcement",
          kategoriApp: "INVESTASI",
          deepLink: routeUserMobile.investmentByStatus({ status: "reject" }),
        },
      });

      console.log("[UPDATE REJECT]", updatedData);
    } else if (status === "publish") {
      const updatedData = await prisma.investasi.update({
        where: {
          id: id,
        },
        data: {
          masterStatusInvestasiId: "1",
          masterProgresInvestasiId: "1",
          countDown: publishTime,
        },
      });

      // SEND NOTIFICAtION
      await sendNotificationMobileToOneUser({
        recipientId: updatedData.authorId as any,
        senderId: senderId,
        payload: {
          title: "Review Selesai",
          body: `
          Investasi kamu telah dipublikasikan !\n
          ${updatedData.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "INVESTASI",
          deepLink: routeUserMobile.investmentByStatus({ status: "publish" }),
        },
      });

      const allUsers = await prisma.user.findMany({
        where: {
          NOT: { id: updatedData.authorId as any },
          active: true,
        },
        select: { id: true },
      });

      await sendNotificationMobileToManyUser({
        recipientIds: allUsers.map((user) => user.id),
        senderId: senderId,
        payload: {
          title: "Ayo Cek Investasi Terbaru" as NotificationMobileTitleType,
          body: `${updatedData.title}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "INVESTASI",
          deepLink: routeUserMobile.investasiDetailPublish({ id: id }),
        },
      });

      console.log("[UPDATE PUBLISH]", updatedData);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success update data investment",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error update data investment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
