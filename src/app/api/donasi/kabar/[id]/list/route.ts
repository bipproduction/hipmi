import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const takeData = 10;
    const skipData = page * takeData - takeData;

    if (!page) {
      fixData = await prisma.donasi_Kabar.findMany({
        where: {
          donasiId: id,
          active: true,
        },
        select: {
          id: true,
          title: true,
          deskripsi: true,
          createdAt: true,
        },
      });
    } else {
      fixData = await prisma.donasi_Kabar.findMany({
        take: takeData,
        skip: skipData,
        where: {
          donasiId: id,
          active: true,
        },
        select: {
          id: true,
          title: true,
          deskripsi: true,
          createdAt: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      reason: error as Error,
    });
  }
}
