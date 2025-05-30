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
      fixData = await prisma.forum_ReportPosting.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Forum_Posting: {
            isActive: true,
            diskusi: {
              contains: search ? search : "",
              mode: "insensitive",
            },
          },
        },
        select: {
          id: true,
          deskripsi: true,
          createdAt: true,
          User: {
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
          ForumMaster_KategoriReport: {
            select: {
              id: true,
              title: true,
              deskripsi: true,
            },
          },
          Forum_Posting: {
            select: {
              diskusi: true,
            },
          },
        },
      });
    } else {
      const data = await prisma.forum_ReportPosting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Forum_Posting: {
            isActive: true,
            diskusi: {
              contains: search ? search : "",
              mode: "insensitive",
            },
          },
        },
        select: {
          id: true,
          isActive: true,
          createdAt: true,
          deskripsi: true,
          forumMaster_KategoriReportId: true,
          ForumMaster_KategoriReport: {
            select: {
              id: true,
              title: true,
              deskripsi: true,
            },
          },

          forum_PostingId: true,
          Forum_Posting: {
            select: {
              id: true,
              diskusi: true,
              ForumMaster_StatusPosting: {
                select: {
                  id: true,
                  status: true,
                },
              },
              Author: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          userId: true,
          User: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      
      const nCount = await prisma.forum_ReportPosting.count({
        where: {
          Forum_Posting: {
            isActive: true,
            diskusi: {
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
        message: "Success get data forum posting",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data forum posting >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data forum posting",
      },
      { status: 500 }
    );
  }
}
