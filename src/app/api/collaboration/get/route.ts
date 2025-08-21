import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let fixData;

    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const page = searchParams.get("page");

    const takeData = 5;
    const skipData = page ? Number(page) * takeData - takeData : 0;

    const userLoginId = await funGetUserIdByToken();

    if (userLoginId == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data, user id tidak ada",
        },
        { status: 500 }
      );
    }

    if (kategori == "beranda") {
      fixData = await prisma.projectCollaboration.findMany({
        take: takeData,
        skip: skipData,
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
    } else if (kategori == "partisipasi") {
      fixData = await prisma.projectCollaboration_Partisipasi.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userLoginId,
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
    } else if (kategori == "proyeksaya") {
      fixData = await prisma.projectCollaboration.findMany({
        take: takeData,
        skip: skipData,
        orderBy: { createdAt: "desc" },
        where: { userId: userLoginId, isActive: true },
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
    } else if (kategori == "grup") {
      fixData = await prisma.projectCollaboration_AnggotaRoomChat.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userLoginId as string,
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
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get collaboration: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
