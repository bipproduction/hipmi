import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export { GET };

async function GET() {
  try {
    const data = await prisma.masterBank.findMany({
      orderBy: {
        updatedAt: "asc",
      },
      where: {
        isActive: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Get Master Bank >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
