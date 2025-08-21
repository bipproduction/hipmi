import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fixData = await prisma.donasiMaster_Kategori.count({});
    return NextResponse.json(
      {
        success: true,
        message: "Success get data donasi dashboard",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        message: "gagal mendapatkan data donasi dashboard",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
