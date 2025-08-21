import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Profile: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data from API ",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
