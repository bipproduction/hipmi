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
    const res = await prisma.masterBank.findMany({
      orderBy: {
        updatedAt: "asc",
      },
      where: {
        isActive: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: res },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error Get Master Bank >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
