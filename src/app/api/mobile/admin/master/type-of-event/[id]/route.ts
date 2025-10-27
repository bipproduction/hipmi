import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.eventMaster_TipeAcara.findUnique({
      where: {
        id: Number(id),
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

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    const updated = await prisma.eventMaster_TipeAcara.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        active: data.active,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success update type of event",
      data: updated,
    });
  } catch (error) {
    console.error("Error update type of event", error);
    return NextResponse.json({
      success: false,
      message: "Error update type of event",
      reason: (error as Error).message,
    });
  }
}
