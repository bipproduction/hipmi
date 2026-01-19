import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.forum_Posting.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        diskusi: true,
        isActive: true,
        createdAt: true,
        authorId: true,
        Author: {
          select: {
            id: true,
            username: true,
          },
        },
        Forum_ReportPosting: {
          select: {
            deskripsi: true,
            ForumMaster_KategoriReport: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      data: data,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mendapatkan data posting",
      reason: (error as Error).message,
    });
  }
}
