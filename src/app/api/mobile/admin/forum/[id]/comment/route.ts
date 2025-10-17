
import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      fixData = await prisma.forum_Komentar.findMany({
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
