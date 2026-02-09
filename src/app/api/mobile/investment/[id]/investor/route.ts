import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = page * takeData - takeData;

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
      take: takeData,
      skip: skipData,
    });

    const totalData = await prisma.investasi_Invoice.count({
      where: {
        investasiId: id,
        statusInvoiceId: "1",
      },
    });

    const totalPages = Math.ceil(totalData / takeData);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: data,
      meta: {
        currentPage: page,
        totalData: totalData,
        totalPage: totalPages,
        dataPerPage: takeData,
      },
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
