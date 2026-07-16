import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../types/type-mobile-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";

export { POST, GET };

async function POST(request: Request) {
  const { data } = await request.json();
  console.log("[DATA]", data);
  const { diskusi, authorId } = data;

  try {
    const create = await prisma.forum_Posting.create({
      data: {
        diskusi: diskusi,
        authorId: authorId,
        forumMaster_StatusPostingId: 1,
      },
    });

    if (!create) {
      return NextResponse.json({
        success: false,
        message: "Gagal memposting",
        status: 400,
      });
    }

    const allUsers = await prisma.user.findMany({
      where: {
        id: { not: authorId },
      },
      select: { id: true },
    });

    // SEND NOTIFICATION
    await sendNotificationMobileToManyUser({
      recipientIds: allUsers.map((user) => user.id),
      senderId: authorId,
      payload: {
        title: "Ada Diskusi Baru" as NotificationMobileTitleType,
        body: `${diskusi}` as NotificationMobileBodyType,
        type: "announcement",
        kategoriApp: "FORUM",
        deepLink: routeUserMobile.forumBeranda,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil membuat postingan",
      data: create,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal membuat postingan",
      reason: (error as Error).message || error,
    });
  }
}

async function GET(request: Request) {
  let fixData;
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const userLoginId = searchParams.get("userLoginId");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = (Number(page) - 1) * takeData;

  try {
    if (category === "beranda") {
      const blockUserId = await prisma.blockedUser
        .findMany({
          where: {
            blockerId: userLoginId as string,
          },
          select: {
            blockedId: true,
          },
        })
        .then((res) => {
          return res.map((item) => item.blockedId);
        });

      console.log("blockUserId", blockUserId);

      const data = await prisma.forum_Posting.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          diskusi: {
            mode: "insensitive",
            contains: search || "",
          },
          authorId: {
            notIn: blockUserId,
          },
        },

        select: {
          id: true,
          diskusi: true,
          createdAt: true,
          isActive: true,
          authorId: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                  imageId: true,
                },
              },
            },
          },
          Forum_Komentar: {
            where: {
              isActive: true,
            },
          },
          ForumMaster_StatusPosting: {
            select: {
              id: true,
              status: true,
            },
          },
          forumMaster_StatusPostingId: true,
        },
      });

      const newData = data.map((item) => {
        const count = item.Forum_Komentar?.length ?? 0;
        return {
          ..._.omit(item, ["Forum_Komentar"]),
          count,
        };
      });

      fixData = newData;
    } else if (category === "forumku") {
      const count = await prisma.forum_Posting.count({
        where: {
          isActive: true,
          authorId: authorId,
        },
      });

      const data = await prisma.forum_Posting.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          authorId: authorId,
        },
        select: {
          id: true,
          diskusi: true,
          createdAt: true,
          isActive: true,
          authorId: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                  imageId: true,
                },
              },
            },
          },
          Forum_Komentar: {
            where: {
              isActive: true,
            },
          },
          ForumMaster_StatusPosting: {
            select: {
              id: true,
              status: true,
            },
          },
          forumMaster_StatusPostingId: true,
        },
      });

      const newData = data.map((item) => {
        const count = item.Forum_Komentar?.length ?? 0;
        return {
          ..._.omit(item, ["Forum_Komentar"]),
          count,
        };
      });

      const dataFix = {
        data: newData,
        count,
      };

      fixData = dataFix;
    } else {
      return NextResponse.json({
        success: false,
        message: "Gagal mendapatkan data",
        reason: "Kategori tidak ditemukan",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data",
      reason: (error as Error).message || error,
    });
  }
}
