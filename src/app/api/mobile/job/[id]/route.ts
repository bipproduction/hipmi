import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, DELETE, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.job.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: {
          select: {
            username: true,
            nomor: true,
            Profile: {
              select: {
                name: true,
                alamat: true,
              },
            },
          },
        },
        MasterStatus: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success get data job-vacancy",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data job-vacancy",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleteData = await prisma.job.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data berhasil dihapus",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data } = await request.json();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    let fixData;

    if (category === "archive") {
      const updateData = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          isArsip: data,
        },
      });

      fixData = updateData;
    } else if (category === "edit") {
      const updateData = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          title: data.title,
          content: data.content,
          deskripsi: data.deskripsi,
          // authorId: data.authorId,
          imageId: data.imageId || null,
        },
      });

      fixData = updateData;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil update data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal update data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
