import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendNotificationMobileToOneUser } from "@/lib/mobile/notification/send-notification";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../../../types/type-mobile-notification";
import { routeUserMobile } from "@/lib/mobile/route-page-mobile";

export { POST, GET, DELETE };

async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { comment, authorId } = data;

  console.log("[ID COMMENT]", id);
  console.log("[DATA COMMENT]", data);

  try {
    const createComment = await prisma.forum_Komentar.create({
      data: {
        forum_PostingId: id,
        komentar: comment,
        authorId: authorId,
      },
      select: {
        id: true,
        isActive: true,
        komentar: true,
        createdAt: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                imageId: true,
              },
            },
          },
        },
      },
    });

    const findForum = await prisma.forum_Posting.findUnique({
      where: { id: id },
      select: { authorId: true, diskusi: true },
    });

    // SEND NOTIFICATION
    await sendNotificationMobileToOneUser({
      recipientId: findForum?.authorId as string,
      senderId: authorId,
      payload: {
        title: "Komentar Baru" as NotificationMobileTitleType,
        body: `Ayo cek komentar pada postingan: ${findForum?.diskusi}` as NotificationMobileBodyType,
        type: "announcement",
        kategoriApp: "FORUM",
        deepLink: routeUserMobile.forumDetail({ id: id }),
      },
    });

    if (!createComment) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal update data",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil update data",
      data: createComment,
    });
  } catch (error) {
    console.log("[ERROR COMMENT]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal update data",
      reason: (error as Error).message || error,
    });
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.forum_Komentar.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        forum_PostingId: id,
        isActive: true,
      },
      select: {
        id: true,
        isActive: true,
        komentar: true,
        createdAt: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                imageId: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR COMMENT]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mendapatkan data",
      reason: (error as Error).message || error,
    });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deleteComment = await prisma.forum_Komentar.delete({
      where: {
        id: id,
      },
    });

    if (!deleteComment) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal hapus komentar",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil hapus komentar",
    });
  } catch (error) {
    console.log("[ERROR COMMENT]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal hapus komentar",
      reason: (error as Error).message || error,
    });
  }
}
