import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let fixData;
  const { id } = params;

  try {
    fixData = await prisma.projectCollaboration.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        isActive: true,
        title: true,
        lokasi: true,
        purpose: true,
        benefit: true,
        createdAt: true,
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
        ProjectCollaborationMaster_Industri: {
          select: {
            name: true,
          },
        },
        ProjectCollaboration_Partisipasi: {
          where: {
            isActive: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil Mendapatkan Data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal Mendapatkan Data",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
