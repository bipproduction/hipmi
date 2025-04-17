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
    const postingId = id;

    if (!page) {
      fixData = await prisma.forum_Komentar.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          forum_PostingId: postingId,
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
                username: true
            }
        }
        
        },
      });
    } else {
      const data = await prisma.forum_Komentar.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          forum_PostingId: postingId,
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
                username: true
            }
        }
        
        },
      });

      const nCount = await prisma.forum_Komentar.count({
        where: {
          forum_PostingId: postingId,
          isActive: true,
          komentar: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data komentar",
      data: fixData,
    });
  } catch (error) {
    console.log("Error get data komentar", error);
    return NextResponse.json(
      {
        status: false,
        message: "Gagal mendapatkan data komentar",
        error: error || (error as Error).message,
      },
      { status: 500 }
    );
  }
}
