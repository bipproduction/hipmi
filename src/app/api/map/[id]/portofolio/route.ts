import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  if (request.method !== "GET") {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const { id } = params;

    const data = await prisma.businessMaps.findUnique({
      where: {
        portofolioId: id,
      },
      include: {
        Portofolio: {
          select: {
            id: true,
            logoId: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data pin map",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get pin map", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data pin map",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
