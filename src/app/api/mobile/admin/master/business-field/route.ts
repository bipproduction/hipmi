import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET, POST };

async function GET(request: Request) {
  try {
    const data = await prisma.masterBidangBisnis.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mendapatkan data",
      data: data,
    });
  } catch (error) {
    console.error(
      "Error Get Master Bidang Bisnis >>",
      error || (error as Error).message
    );
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Get Master Bidang Bisnis ",
      reason: (error as Error).message,
    });
  }
}

async function POST(request: Request) {
  const { data } = await request.json();
  try {
    const count = await prisma.masterBidangBisnis.count();
    const createNewId = count + 1;

    const slugName = data.name.toLowerCase().replace(/\s+/g, "_");

    const create = await prisma.masterBidangBisnis.create({
      data: {
        id: createNewId.toString(),
        name: data.name,
        slug: slugName,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil menambahkan data",
      data: create,
    });
  } catch (error) {
    console.error("Error Post Master Business Field >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Post Data",
      reason: (error as Error).message,
    });
  }
}
