import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // const res = await prisma.masterBank.findMany({
    //   orderBy: {
    //     updatedAt: "asc",
    //   },
    //   where: {
    //     isActive: true,
    //   },
    // });

    await prisma.$disconnect();
    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: "" },
      { status: 200 }
    );
  } catch (error) {
    await prisma.$disconnect();
    backendLogger.error("Error Get Master Status Transaksi >>", error);
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
