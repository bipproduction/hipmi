import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;

    if (!page) {
      fixData = await prisma.forum_Posting.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          diskusi: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          diskusi: true,
          isActive: true,
          createdAt: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
          Forum_ReportPosting: true,
          Forum_Komentar: {
            where: {
              isActive: true,
            },
          },
          ForumMaster_StatusPosting: true,
        },
      });
    } else {
      const data = await prisma.forum_Posting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          diskusi: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          diskusi: true,
          isActive: true,
          createdAt: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
          Forum_ReportPosting: true,
          Forum_Komentar: {
            where: {
              isActive: true,
            },
          },
          ForumMaster_StatusPosting: true,
        },
      });

      const nCount = await prisma.forum_Posting.count({
        where: {
          isActive: true,
          diskusi: {
            contains: search ? search : "",
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data: data,
        nCount: _.ceil(nCount / takeData),
      };
    }
    return NextResponse.json(
      {
        success: true,
        message: "Success get data table forum",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data table forum", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data table forum",
        reason: error as Error,
      },
      { status: 500 }
    );
  }
}
