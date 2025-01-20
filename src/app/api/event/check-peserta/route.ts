import { prisma } from "@/app/lib";
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
    let fixData;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const eventId = searchParams.get("eventId");

    const check = await prisma.event_Peserta.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    if (check) {
      fixData = true;
    } else {
      fixData = false;
    }

    await prisma.$disconnect();
    return NextResponse.json(
      { success: true, message: "Success get data", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    await prisma.$disconnect();
    backendLogger.error("Error get data detail event:", error);
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
