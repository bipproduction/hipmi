import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";

export const dynamic = "force-dynamic";

export { GET };

async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const roomId = params.id;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 10;
    const dataSkip = Number(page) * takeData - takeData;

    const getList = await prisma.projectCollaboration_Message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: dataSkip,
      take: takeData,
      where: {
        projectCollaboration_RoomChatId: roomId,
      },
      select: {
        id: true,
        createdAt: true,
        isActive: true,
        message: true,
        isFile: true,
        User: {
          select: {
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
    });

    const dataReverse = _.reverse(getList);

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: dataReverse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get message by room id", error);
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
