import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const data = await prisma.investasi_Invoice.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        investasiId: true,
        nominal: true,
        createdAt: true,
        Author: true,
        StatusInvoice: true,
        imageId: true,
        MasterBank: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get detail Investasi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
