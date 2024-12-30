import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = await prisma.voting_Status.findMany();
    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
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
