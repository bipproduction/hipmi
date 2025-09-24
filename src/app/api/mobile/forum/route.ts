import { NextResponse } from "next/server";

export { POST , GET};

async function POST(request: Request) {
  const { data } = await request.json();
  console.log("[DATA]", data);

  try {
    const create = await prisma.forum_Posting.create({
      data: {
        diskusi: data.diskusi,
        authorId: data.authorId,
        forumMaster_StatusPostingId: 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil membuat postingan",
      data: create,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal membuat postingan",
      reason: (error as Error).message || error,
    });
  }
}

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  
  try {
    const data = await prisma.forum_Posting.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isActive: true,
          diskusi: {
            mode: "insensitive",
            contains: search  || "",
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

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data",
      reason: (error as Error).message || error,
    });
  }
}
