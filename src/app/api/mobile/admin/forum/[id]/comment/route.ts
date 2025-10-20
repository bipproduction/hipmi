import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;
  const category = searchParams.get("category");
  let fixData;
  try {
    if (category === "get-all") {
      const getData = await prisma.forum_Komentar.findMany({
        take: page ? takeData : undefined,
        skip: page ? skipData : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          forum_PostingId: id,
          isActive: true,
          komentar: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
        include: {
          Forum_ReportKomentar: true,
          Author: {
            select: {
              username: true,
            },
          },
        },
      });

      fixData = getData.map((v: any) => ({
        ..._.omit(v, ["Forum_ReportKomentar"]),
        countReport: v.Forum_ReportKomentar.length,
      }));
    } else if (category === "get-one") {
      fixData = await prisma.forum_Komentar.findUnique({
        where: {
          id: id,
        },
        include: {
          Forum_ReportKomentar: true,
          Author: {
            select: {
              username: true,
            },
          },
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get detail comment",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[ERROR GET ${category} COMMENT]`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail data comment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const deleteData = await prisma.forum_Komentar.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success deactivate comment",
        data: deleteData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR DEACTIVATE COMMENT]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deactivate comment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
