import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import _ from "lodash";

export { GET };

async function GET(request: Request, { params }: { params: { name: string } }) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  let fixData;
  try {
    if (category === "dashboard") {
      const posting = await prisma.forum_Posting.count({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
        },
      });

      const reportPosting = await prisma.forum_ReportPosting.count({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Forum_Posting: {
            isActive: true,
          },
        },
      });

      const reportComment = await prisma.forum_ReportKomentar.count({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          Forum_Komentar: {
            isActive: true,
          },
        },
      });

      fixData = {
        posting,
        reportPosting,
        reportComment,
      };
    } else if (category === "posting") {
      const data = await prisma.forum_Posting.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          diskusi: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          diskusi: true,
          isActive: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
          _count: {
            select: {
              Forum_ReportPosting: true,
              Forum_Komentar: true,
            },
          },
        },
      });

      fixData = data.map((item) => ({
        ..._.omit(item, "_count"),
        reportPosting: item._count.Forum_ReportPosting,
        komentar: item._count.Forum_Komentar,
      }));

      console.log("fixData >>", fixData);
    } else if (category === "report_posting") {
      const data = await prisma.forum_ReportPosting.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
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
              id: true,
              diskusi: true,
            },
          },
        },
      });

      const filterLatest = (data: any) =>
        Object.values(
          data.reduce((acc: any, item: any) => {
            const key = item.Forum_Posting?.id;
            if (!key) return acc;
            if (
              !acc[key] ||
              new Date(item.createdAt) > new Date(acc[key].createdAt)
            ) {
              acc[key] = item;
            }
            return acc;
          }, {})
        );

      fixData = filterLatest(data);
    } else if (category === "report_comment") {
      const data = await prisma.forum_ReportKomentar.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
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

      const filterLatest = (data: any) =>
        Object.values(
          data.reduce((acc: any, item: any) => {
            const key = item.Forum_Komentar?.id;
            if (!key) return acc;
            if (
              !acc[key] ||
              new Date(item.createdAt) > new Date(acc[key].createdAt)
            ) {
              acc[key] = item;
            }
            return acc;
          }, {})
        );

      fixData = filterLatest(data);
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category",
          reason: "Invalid category",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Success get data forum ${category}`,
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error get data forum ${category}`,
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
