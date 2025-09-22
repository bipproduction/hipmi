import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await request.json();

  console.log("[id]", id);
  console.log("[data]", data);

  try {
    const create = await prisma.projectCollaboration_Partisipasi.create({
      data: {
        projectCollaborationId: id,
        userId: data.authorId,
        deskripsi_diri: data.description,
      },
      select: {
        ProjectCollaboration: {
          select: {
            id: true,
            title: true,
            userId: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menambahkan partisipan",
        // data: create,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error menambahkan partisipan",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let fixData;
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const category = searchParams.get("category");

  try {
    if (category === "list") {
      const data = await prisma.projectCollaboration_Partisipasi.findMany({
        where: {
          projectCollaborationId: id,
        },
        select: {
          id: true,
          deskripsi_diri: true,
          User: {
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
        },
      });

      fixData = data;
    } else if (category === "check-participant") {
      const cek = await prisma.projectCollaboration_Partisipasi.count({
        where: {
          projectCollaborationId: id,
          userId: authorId,
        },
      });

      console.log("[CEK]", cek);

      if (cek === 0) {
        fixData = false;
      } else {
        fixData = true;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data partisipan",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error mendapatkan data partisipan",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
