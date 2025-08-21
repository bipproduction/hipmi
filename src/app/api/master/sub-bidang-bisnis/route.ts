import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let fixData;
    fixData = await prisma.masterSubBidangBisnis.findMany({
      where: {
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error Get Master Sub Bidang Bisnis >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
