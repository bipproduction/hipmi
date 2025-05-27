import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const roomId = params.id;
    const getData = await prisma.projectCollaboration_RoomChat.findUnique({
      where: {
        id: roomId,
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
            Author: true,
          },
        },
        ProjectCollaboration_AnggotaRoomChat: {
          select: {
            User: {
              select: {
                username: true,
                id: true,
                Profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: getData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get room by id", error);
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
