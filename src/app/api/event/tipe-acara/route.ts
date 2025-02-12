import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const data = await prisma.eventMaster_TipeAcara.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success get tipe acara",
      data: data,
    });
  } catch (error) {
    backendLogger.error("Error get tipe acara", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed get tipe acara ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
