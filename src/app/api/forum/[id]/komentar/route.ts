import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    let fixData;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 5;
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.forum_Komentar.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          forum_PostingId: id,
          isActive: true,
        },
        select: {
          id: true,
          isActive: true,
          komentar: true,
          createdAt: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                  imageId: true,
                },
              },
            },
          },
          authorId: true,
        },
      });
    } else {
      fixData = await prisma.forum_Komentar.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          forum_PostingId: id,
          isActive: true,
        },
        select: {
          id: true,
          isActive: true,
          komentar: true,
          createdAt: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                  imageId: true,
                },
              },
            },
          },
          authorId: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error Get Forum Komentar >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
