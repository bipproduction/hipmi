import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export { GET, POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { userId } = await request.json();

    const createJoin = await prisma.event_Peserta.create({
      data: {
        eventId: id,
        userId: userId,
      },

      // select: {
      //   Event: {
      //     select: {
      //       id: true,
      //       title: true,
      //       authorId: true,
      //     },
      //   },
      // },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success join event",
        data: createJoin,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error join event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const data = await prisma.event_Peserta.findMany({
      where: {
        eventId: id,
      },
      select: {
        eventId: true,
        userId: true,
        isPresent: true,
        User: {
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
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get participants",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get participants",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
