import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST, GET };

async function POST(request: Request) {
  const { data } = await request.json();
  console.log("[DATA]", data);

  try {
    const create = await prisma.projectCollaboration.create({
      data: {
        title: data?.title || "",
        lokasi: data?.lokasi || "",
        purpose: data?.purpose || "",
        benefit: data?.benefit || "",
        projectCollaborationMaster_IndustriId:
          data?.projectCollaborationMaster_IndustriId || "",
        userId: data?.userId || "",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil Membuat Proyek",
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal Membuat Proyek",
        reason: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}

async function GET(request: Request) {
  let fixData;
  try {
    fixData = await prisma.projectCollaboration.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        projectCollaborationMaster_StatusId: 1,
        isActive: true,
      },
      select: {
        id: true,
        isActive: true,
        title: true,
        lokasi: true,
        purpose: true,
        benefit: true,
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
        ProjectCollaborationMaster_Industri: true,
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
