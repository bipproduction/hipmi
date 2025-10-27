import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await prisma.masterBidangBisnis.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    console.error("Error Get Master Bank >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Get Data",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();

  try {
    const updateData = await prisma.masterBidangBisnis.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        active: data.active,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mengupdate data",
    });
  } catch (error) {
    console.error("Error Update Master Bank >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Update Data",
      reason: (error as Error).message,
    });
  }
}
