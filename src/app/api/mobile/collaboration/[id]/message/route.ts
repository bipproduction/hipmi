import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.projectCollaboration_Message.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        projectCollaboration_RoomChatId: id,
      },
      select: {
        id: true,
        createdAt: true,
        isActive: true,
        message: true,
        isFile: true,
        userId: true,
        User: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data",
      reason: (error as Error).message || error,
    });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { data } = await request.json();

  console.log("[ID]", id);
  console.log("[DATA]", data);

  try {
    const msg = await prisma.projectCollaboration_Message.create({
      data: {
        userId: data.userId,
        message: data.message,
        projectCollaboration_RoomChatId: id,
      },
    //   select: {
    //     id: true,
    //     createdAt: true,
    //     isActive: true,
    //     message: true,
    //     isFile: true,
    //     User: {
    //       select: {
    //         id: true,
    //         Profile: {
    //           select: {
    //             id: true,
    //             name: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil mengirim pesan",
      data: msg,
    });
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mengirim pesan",
      reason: (error as Error).message || error,
    });
  }
}
