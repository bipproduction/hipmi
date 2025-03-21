import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await prisma.projectCollaboration_RoomChat.findUnique({
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
            Author: true
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
        message: "Success get data collaboration group",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    backendLogger.error("Error get data collaboration group", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data collaboration group",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
