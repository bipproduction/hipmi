import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";

export async function GET(request: Request) {
  try {
    const data = await prisma.forumMaster_KategoriReport.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    backendLogger.error("Error Get Master Kategori Report >>", error);
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
