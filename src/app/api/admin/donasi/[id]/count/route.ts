import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.donasi_Invoice.count({
      where: {
        donasiId: id,
        donasiMaster_StatusInvoiceId: "1",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: data,
    });
  } catch (error) {
    console.error("Error get count donasi ", error);
    return NextResponse.json({
      success: false,
      message: "Error get count donasi",
      reason: (error as Error).message,
    });
  }
}
