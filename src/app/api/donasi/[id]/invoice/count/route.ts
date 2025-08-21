import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await prisma.donasi_Invoice.count({
      where: {
        donasiId: id,
        donasiMaster_StatusInvoiceId: {
          equals: "1",
        },
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
      reason: (error as Error).message || error,
    });
  }
}
