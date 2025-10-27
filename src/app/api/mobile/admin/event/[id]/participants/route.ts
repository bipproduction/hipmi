import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

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
            nomor: true,
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
