import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.investasi_Invoice.findMany({
      where: {
        investasiId: id,
        statusInvoiceId: "1",
      },
      select: {
        id: true,
        nominal: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                name: true,
                imageId: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error Mendapatkan Data",
      reason: (error as Error).message,
    });
  }
}
