import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";
import { sendNotificationMobileToOneUser } from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  const { id } = params;
  try {
    const data = await prisma.forum_Posting.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        isActive: true,
        diskusi: true,
        ForumMaster_StatusPosting: {
          select: {
            id: true,
            status: true,
          },
        },
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        Forum_Komentar: {
          where: {
            isActive: true,
          },
        },
        Forum_ReportPosting: {
          where: {
            isActive: true,
          },
        },
      },
    });

    const result = {
      ..._.omit(data, "Forum_Komentar", "Forum_ReportPosting"),
      JumlahKomentar: data?.Forum_Komentar.length,
      JumlahReportPosting: data?.Forum_ReportPosting.length,
    };

    return NextResponse.json({
      success: true,
      message: "Success get data",
      data: result,
    });
  } catch (error) {
    console.error("Error get data forum", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data forum",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();
  const { senderId } = data;

  console.log("SENDER POSTING", data);

  try {
    const deactivePosting = await prisma.forum_Posting.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
      select: {
        authorId: true,
        diskusi: true,
      },
    });

    const deactivateComment = await prisma.forum_Komentar.updateMany({
      where: {
        forum_PostingId: id,
      },
      data: {
        isActive: false,
      },
    });

    // SEND NOTIFICATION
    await sendNotificationMobileToOneUser({
      recipientId: deactivePosting?.authorId as string,
      senderId: senderId,
      payload: {
        title: "Penghapusan Postingan" as NotificationMobileTitleType,
        body: `Postingan anda telah dilaporkan: ${deactivePosting?.diskusi}` as NotificationMobileBodyType,
        type: "announcement",
        kategoriApp: "FORUM",
        deepLink: routeUserMobile.forumPreviewReportPosting({ id: id }),
      },
    });

    console.log("[DEACTIVATE POSTINGAN & COMMENT]", deactivateComment);
    return NextResponse.json(
      {
        success: true,
        message: "Success deactivate posting",
        data: deactivePosting,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR DEACTIVATE POSTING]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deactivate posting",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
