import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await prisma.masterStatusTransaksi.findMany({
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
    console.log("[ERROR]", error);
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
