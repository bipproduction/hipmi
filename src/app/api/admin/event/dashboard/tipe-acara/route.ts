import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fixData = await prisma.eventMaster_TipeAcara.count({
      where: {
        active: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get data riwayat event dashboard",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data riwayat event dashboard >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
