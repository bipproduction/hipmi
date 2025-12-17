import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;
    const { id } = params;
    const komentarId = id;

    fixData = await prisma.forum_ReportKomentar.findMany({
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        forum_KomentarId: komentarId,
      },
      select: {
        id: true,
        deskripsi: true,
        ForumMaster_KategoriReport: {
          select: {
            title: true,
            deskripsi: true,
          },
        },
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

    return NextResponse.json(
      {
        success: true,
        message: "Success get list report comment",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR GET LIST REPORT COMMENT]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get list report comment",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
