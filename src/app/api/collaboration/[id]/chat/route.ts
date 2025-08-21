// /app/api/collaboration/[id]/chat/route.ts

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
    const cursor = searchParams.get("cursor"); // ini adalah `id` pesan terakhir dari client
    const takeData =5

    console.log("cursor", cursor);

    // Query dengan cursor
    const messages = await prisma.projectCollaboration_Message.findMany({
      where: {
        projectCollaboration_RoomChatId: roomId,
        isActive: true,
        id: cursor ? { lt: cursor } : undefined, // ambil yang lebih lama dari cursor
      },
      orderBy: {
        createdAt: "desc", // urutkan dari paling baru
      },
      take: takeData,
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

   return NextResponse.json({
     success: true,
     message: "Berhasil mendapatkan data",
     data: messages,
     nextCursor: messages.length > 0 ? messages[messages.length - 1]?.id : null,
   });
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
