import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = context.params;
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    // data room { id, grup_name}
    if (kategori == "detail") {
      fixData = await prisma.projectCollaboration_RoomChat.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } else if (kategori == "info_group") {
      fixData = await prisma.projectCollaboration_RoomChat.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          ProjectCollaboration: {
            select: {
              id: true,
              isActive: true,
              title: true,
              lokasi: true,
              purpose: true,
              benefit: true,
              createdAt: true,
              ProjectCollaborationMaster_Industri: true,
            },
          },
          ProjectCollaboration_AnggotaRoomChat: {
            select: {
              User: {
                select: {
                  id: true,
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
          },
        },
      });
    }

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Gagal mendapatkan data", error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
