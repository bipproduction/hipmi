import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, POST };

async function GET(request: Request) {
  try {
    const data = await prisma.eventMaster_TipeAcara.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success get type of event",
      data: data,
    });
  } catch (error) {
    console.error("Error get type of event", error);
    return NextResponse.json({
      success: false,
      message: "Error get type of event",
      reason: (error as Error).message,
    });
  }
}

async function POST(request: Request) {
  const { data } = await request.json();

  try {
    const checkList = await prisma.eventMaster_TipeAcara.count({});

    if (!checkList) {
      return NextResponse.json(
        {
          success: false,
          message: "Type of event already exists",
        },
        { status: 400 }
      );
    }

    const created = await prisma.eventMaster_TipeAcara.create({
      data: {
        id: checkList + 1,
        name: data,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success create type of event",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error create type of event", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error create type of event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
