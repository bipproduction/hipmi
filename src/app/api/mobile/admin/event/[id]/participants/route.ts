import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = page * takeData - takeData;

  try {
    const { id } = params;

    const data = await prisma.event_Peserta.findMany({
      where: {
        eventId: id,
      },
      select: {
        id: true,
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
        Event: {
          select: {
            tanggal: true,
          },
        },
      },
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
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
