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
      fixData = await prisma.forum_ReportKomentar.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Forum_Komentar: {
            isActive: true,
            komentar: {
              contains: search ? search : "",
              mode: "insensitive",
            },
          },
        },
        include: {
          ForumMaster_KategoriReport: true,
          User: {
            select: {
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          Forum_Komentar: {
            select: {
              id: true,
              komentar: true,
            },
          },
        },
      });
    } else {
      const data = await prisma.forum_ReportKomentar.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Forum_Komentar: {
            isActive: true,
            komentar: {
              contains: search ? search : "",
              mode: "insensitive",
            },
          },
        },
        include: {
          ForumMaster_KategoriReport: true,
          User: {
            select: {
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          Forum_Komentar: {
            select: {
              id: true,
              komentar: true,
            },
          },
        },
      });
      const nCount = await prisma.forum_ReportKomentar.count({
        where: {
          Forum_Komentar: {
            isActive: true,
            komentar: {
              contains: search ? search : "",
              mode: "insensitive",
            },
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
        message: "Success get data forum komentar",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data forum komentar", error);
    return NextResponse.json({
      success: false,
      message: "Error get data forum komentar",
      reason: (error as Error).message,
    });
  }
}
