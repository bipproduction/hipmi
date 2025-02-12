import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fixData = await prisma.forum_Posting.count({
      where: {
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get data forum dashboard",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data forum dashboard", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data forum dashboard",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
