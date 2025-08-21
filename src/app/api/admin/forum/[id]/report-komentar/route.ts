import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;
    const { id } = params;
    const komentarId = id;

    if (!page) {
      fixData = await prisma.forum_ReportKomentar.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          forum_KomentarId: komentarId,
        },
        select: {
          id: true,
          isActive: true,
          createdAt: true,
          deskripsi: true,
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
          forum_KomentarId: komentarId,
        },
        select: {
          id: true,
          isActive: true,
          createdAt: true,
          deskripsi: true,
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
        },
      });

      const nCount = await prisma.forum_ReportKomentar.count({
        where: {
          forum_KomentarId: komentarId,
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get detail data report komentar",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get detail data report komentar >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail data report komentar",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
