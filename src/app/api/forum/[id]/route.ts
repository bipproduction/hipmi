import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const data = await prisma.forum_Posting.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        diskusi: true,
        isActive: true,
        createdAt: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: true,
          },
        },
        _count: {
          select: {
            Forum_Komentar: {
              where: {
                isActive: true,
              },
            },
          },
        },
        ForumMaster_StatusPosting: true,
        forumMaster_StatusPostingId: true,
      },
    });

    const fixData = {
      ...data,
      count: data?._count.Forum_Komentar,
    };

    return NextResponse.json({
      success: true,
      message: "Success get data",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get data forum", error);
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
