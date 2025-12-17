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
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const authorId = searchParams.get("authorId");

  console.log("[CATEGORY]", category);
  console.log("[AUTHOR_ID]", authorId);

  try {
    if (category === "beranda") {
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
    } else if (category === "participant") {
      fixData = await prisma.projectCollaboration_Partisipasi.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: authorId,
          isActive: true,
          AND: {
            ProjectCollaboration: {
              isActive: true,
            },
          },
        },
        select: {
          id: true,
          isActive: true,
          ProjectCollaboration: {
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
                  Profile: true,
                },
              },
              ProjectCollaborationMaster_Industri: true,
              ProjectCollaboration_Partisipasi: {
                where: {
                  isActive: true,
                },
              },
            },
          },
        },
      });
    } else if (category === "my-project") {
      fixData = await prisma.projectCollaboration.findMany({
        orderBy: { createdAt: "desc" },
        where: { userId: authorId, isActive: true },
        select: {
          id: true,
          isActive: true,
          title: true,
          lokasi: true,
          purpose: true,
          benefit: true,
          // jumlah_partisipan: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
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
    } else if (category === "group") {
      fixData = await prisma.projectCollaboration_AnggotaRoomChat.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: authorId as any,
        },
        select: {
          ProjectCollaboration_RoomChat: {
            select: {
              id: true,
              name: true,
              isActive: true,
              ProjectCollaboration_AnggotaRoomChat: {
                select: {
                  User: true,
                },
              },
            },
          },
        },
      });
    }

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
