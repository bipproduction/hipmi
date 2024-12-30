import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const data = await prisma.masterKategoriApp.findMany({
      where: {
        isActive: true,
      },
    });

    data.unshift({
      id: "0",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Semua",
      value: null,
    });

    return NextResponse.json(
      { success: true, data, message: "Berhasil mendapatkan data" },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Master Notifikasi:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
