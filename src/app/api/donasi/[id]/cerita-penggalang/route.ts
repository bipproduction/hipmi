import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const donasiId = params.id;
    const data = await prisma.donasi_Cerita.findFirst({
      where: {
        donasiId: donasiId,
      },
      select: {
        id: true,
        pembukaan: true,
        cerita: true,
        imageCeritaDonasi: true,
        createdAt: true,
        imageId: true,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      reason: error as Error,
    });
  }
}
