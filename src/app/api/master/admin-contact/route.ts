import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const data = await prisma.nomorAdmin.findFirst({
      where: {
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success get admin contact",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get admin contact", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get admin contact",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
