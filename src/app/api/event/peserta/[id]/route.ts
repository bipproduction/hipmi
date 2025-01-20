import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    let fixData;
    const { id } = context.params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    fixData = await prisma.event_Peserta.findMany({
      take: takeData,
      skip: skipData,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        eventId: id,
      },
      select: {
        id: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        isPresent: true,
        User: {
          select: {
            Profile: true,
          },
        },
        Event: true,
        eventId: true,
      },
    });

    

    console.log("server", fixData)
    return NextResponse.json({
      success: true,
      message: "Success get data",
      data: fixData,
    });
  } catch (error) {

    backendLogger.error("Error get list data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed get data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
