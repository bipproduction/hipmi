import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import _ from "lodash";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
