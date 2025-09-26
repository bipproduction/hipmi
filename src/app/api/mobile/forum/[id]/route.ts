import prisma from "@/lib/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export { GET, PUT, DELETE, POST };

async function GET(request: Request, { params }: { params: { id: string } }) {
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
            Profile: true,
          },
        },
        Forum_Komentar: {
          where: {
            isActive: true,
          },
        },
        ForumMaster_StatusPosting: true,
        forumMaster_StatusPostingId: true,
      },
    });

    const count = data?.Forum_Komentar?.length ?? 0;

    const newData = {
      ..._.omit(data, ["Forum_Komentar"]),
      count,
    };

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: newData,
    });
  } catch (error) {
    console.log("[ERROR FORUM]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data",
      reason: (error as Error).message || error,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  console.log("[DATA]", data);

  try {
    const update = await prisma.forum_Posting.update({
      where: {
        id: id,
      },
      data: {
        diskusi: data,
      },
    });

    if (!update) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal update data",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil update data",
    });
  } catch (error) {
    console.log("[ERROR FORUM]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal update data",
      reason: (error as Error).message || error,
    });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const dlt = await prisma.forum_Posting.delete({
      where: {
        id: id,
      },
    });

    if (!dlt) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal hapus data",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil hapus data",
    });
  } catch (error) {
    console.log("[ERROR FORUM]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error hapus data",
      reason: (error as Error).message || error,
    });
  }
}

// Update Status
async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  console.log("[DATA]", data);

  const status = await prisma.forumMaster_StatusPosting.findFirst({
    where: {
      status: data,
    },
  });

  console.log("[STATUS]", status);

  try {
    const update = await prisma.forum_Posting.update({
      where: {
        id: id,
      },
      data: {
        forumMaster_StatusPostingId: status?.id,
      },
    });

    if (!update) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal update data",
      });
    }

    const fixData = status?.status;

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil update data",
      data: fixData,
    });
    
  } catch (error) {
    console.log("[ERROR FORUM]", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal update data",
      reason: (error as Error).message || error,
    });
  }
}
