import { prisma } from "@/lib";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import { NextResponse } from "next/server";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  let fixData;
  const { id } = params;
  const { data } = await request.json();
  const { authorId: reportedUserId, categoryId, description } = data;

  try {
    // Komentar yang di report
    const findComment = await prisma.forum_Komentar.findUnique({
      where: { id: id },
      select: { authorId: true, komentar: true },
    });

    // List admin untuk dikirim notifikasi
    const adminUsers = await prisma.user.findMany({
      where: {
        masterUserRoleId: "2",
        NOT: { id: findComment?.authorId as any },
      },
      select: { id: true },
    });

    if (categoryId) {
      const createdReport = await prisma.forum_ReportKomentar.create({
        data: {
          forum_KomentarId: id,
          userId: reportedUserId,
          forumMaster_KategoriReportId: categoryId,
        },
      });

      //SEND NOTIFICATION
      await sendNotificationMobileToManyUser({
        recipientIds: adminUsers.map((user) => user.id),
        senderId: reportedUserId,
        payload: {
          title: "Laporan Dari User" as NotificationMobileTitleType,
          body: `Report terhadap komentar, ${findComment?.komentar}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "FORUM",
          deepLink: routeAdminMobile.forumPreviewReportComment,
        },
      });

      fixData = createdReport;
    } else {
      const createdReport = await prisma.forum_ReportKomentar.create({
        data: {
          forum_KomentarId: id,
          userId: reportedUserId,
          deskripsi: description,
        },
      });

      //SEND NOTIFICATION
      await sendNotificationMobileToManyUser({
        recipientIds: adminUsers.map((user) => user.id),
        senderId: reportedUserId,
        payload: {
          title: "Laporan Dari User" as NotificationMobileTitleType,
          body: `Report terhadap komentar, ${findComment?.komentar}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "FORUM",
          deepLink: routeAdminMobile.forumPreviewReportComment,
        },
      });

      fixData = createdReport;
    }

    if (!fixData) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat report komentar",
      });
    }

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil membuat report komentar",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal membuat report komentar",
      reason: (error as Error).message,
    });
  }
}
