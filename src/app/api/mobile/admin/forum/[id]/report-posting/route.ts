import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = Number(page) * takeData - takeData;
  let fixData;

  try {
    fixData = await prisma.forum_ReportPosting.findMany({
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        forum_PostingId: id,
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
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get list report posting",
        data: fixData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[ERROR GET LIST REPORT POSTING]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get list report posting",
        reason: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
