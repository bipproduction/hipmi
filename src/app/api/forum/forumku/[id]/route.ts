import { NextResponse } from "next/server";

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
      fixData = await prisma.forum_Posting.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          authorId: id,
          isActive: true,
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
          authorId: id,
          isActive: true,
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

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
