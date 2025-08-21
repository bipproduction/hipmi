import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let fixData;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const takeData = 5
    const skipData = page * takeData - takeData;

    if (!page) {
      fixData = await prisma.donasi_PencairanDana.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          donasiId: id,
        },
      });
    } else {
      fixData = await prisma.donasi_PencairanDana.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "asc",
        },
        where: {
          donasiId: id,
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
