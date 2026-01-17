import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  sendNotificationMobileToManyUser,
  sendNotificationMobileToOneUser,
} from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";
import {
  routeAdminMobile,
  routeUserMobile,
} from "@/lib/mobile/route-page-mobile";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  let fixData;
  const { id } = params;
  const { data } = await request.json();
  const { authorId: reportedUserId, categoryId, description } = data;

  console.log("[DATA]", data);
  console.log("[ID]", id);

  try {
    // Postingan yang akan di report
    const findPosting = await prisma.forum_Posting.findUnique({
      where: { id: id },
      select: { authorId: true, diskusi: true },
    });

    // List admin untuk dikirim notifikasi
    const adminUsers = await prisma.user.findMany({
      where: {
        masterUserRoleId: "2",
        NOT: { id: findPosting?.authorId as any },
      },
      select: { id: true },
    });

    if (categoryId) {
      const createReported = await prisma.forum_ReportPosting.create({
        data: {
          forum_PostingId: id,
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
          body: `Report terhadap postingan, ${findPosting?.diskusi}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "FORUM",
          deepLink: routeAdminMobile.forumPreviewReportPosting,
        },
      });

      fixData = createReported;
    } else {
      const createReported = await prisma.forum_ReportPosting.create({
        data: {
          forum_PostingId: id,
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
          body: `Report terhadap postingan, ${findPosting?.diskusi}` as NotificationMobileBodyType,
          type: "announcement",
          kategoriApp: "FORUM",
          deepLink: routeAdminMobile.forumPreviewReportPosting,
        },
      });

      fixData = createReported;
    }

    if (!fixData) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat report posting",
      });
    }

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Berhasil membuat report posting",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal membuat report posting",
      reason: (error as Error).message,
    });
  }
}

// async function GET(request: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const report = await prisma.forum_ReportPosting.findUnique({
//       where: { id: id },
//       select: {
//         id: true,
//         ForumMaster_KategoriReport: true,
//         deskripsi: true,
//         Forum_Posting: {
//           select: {
//             id: true,
//             diskusi: true,
//             authorId: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       status: 200,
//       success: true,
//       data: report,
//     });
//   } catch (error) {
//     console.log("[ERROR]", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Gagal mendapatkan report posting",
//       reason: (error as Error).message,
//     });
//   }
// }
