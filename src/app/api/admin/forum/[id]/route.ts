import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.forum_Posting.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
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
      },
    });

    const result = {
      ..._.omit(data, "Forum_Komentar"),
      Forum_Komentar: data?.Forum_Komentar.length,
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
