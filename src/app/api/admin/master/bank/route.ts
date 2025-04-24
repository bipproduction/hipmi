import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(request: Request) {
  try {
    const data = await prisma.masterBank.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error Get Master Bank >>",
      error || (error as Error).message
    );
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Master Bank ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
