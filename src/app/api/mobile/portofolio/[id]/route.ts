import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const data = await prisma.portofolio.findUnique({
      where: {
        id: id,
      },
      include: {
        Profile: {
          include: {
            User: true,
          },
        },
        MasterBidangBisnis: true,
        Portofolio_MediaSosial: true,
      },
    });

    if (!data)
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak ditemukan",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data Potofolio",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
