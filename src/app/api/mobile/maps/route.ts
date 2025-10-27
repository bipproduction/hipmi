import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { POST };

async function POST(request: Request) {
  const { data } = await request.json();

  try {
    const created = await prisma.businessMaps.create({
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        namePin: data.namePin,
        imageId: data.imageId || null,
        portofolioId: data.portofolioId,
        authorId: data.authorId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil membuat pin map",
      data: created,
    });
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal membuat pin map",
      reason: (error as Error).message,
    });
  }
}

export async function GET(request: Request) {
  try {
    const data = await prisma.businessMaps.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        Portofolio: {
          select: {
            id: true,
            namaBisnis: true,
            logoId: true,
            alamatKantor: true,
            tlpn: true,
            MasterBidangBisnis: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data pin map",
      data: data,
    });
  } catch (error) {
    console.error("[ERROR]", error);
    return NextResponse.json({
      success: false,
      message: "Gagal mendapatkan data pin map",
      reason: (error as Error).message,
    });
  }
}
