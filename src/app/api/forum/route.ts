import { prisma } from "@/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET  ALL DATA PORTOFOLIO BY PROFILE ID
export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const takeData = 5;
    const skipData = Number(page) * takeData - takeData;


    if (!page) {
      fixData = await prisma.forum_Posting.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          diskusi: {
            mode: "insensitive",
            contains: search == undefined || search == "null" ? "" : search,
          },
        },
        select: {
          id: true,
          diskusi: true,
          createdAt: true,
          isActive: true,
          authorId: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                  imageId: true,
                },
              },
            },
          },
          Forum_Komentar: {
            where: {
              isActive: true,
            },
          },
          ForumMaster_StatusPosting: {
            select: {
              id: true,
              status: true,
            },
          },
          forumMaster_StatusPostingId: true,
        },
      });
    } else {
      fixData = await prisma.forum_Posting.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          diskusi: {
            mode: "insensitive",
            contains: search == undefined || search == "null" ? "" : search,
          },
        },
        select: {
          id: true,
          diskusi: true,
          createdAt: true,
          isActive: true,
          authorId: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  id: true,
                  name: true,
                  imageId: true,
                },
              },
            },
          },
          Forum_Komentar: {
            where: {
              isActive: true,
            },
          },
          ForumMaster_StatusPosting: {
            select: {
              id: true,
              status: true,
            },
          },
          forumMaster_StatusPostingId: true,
        },
      });
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data, coba lagi nanti ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
