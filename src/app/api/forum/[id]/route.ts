import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

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
            Forum_Komentar: true,
          },
        },
        ForumMaster_StatusPosting: true,
        forumMaster_StatusPostingId: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success get data",
      data: data,
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
