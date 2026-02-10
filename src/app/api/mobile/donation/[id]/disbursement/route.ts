import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const takeData = PAGINATION_DEFAULT_TAKE;
  const skipData = page * takeData - takeData;

  try {
    const data = await prisma.donasi_PencairanDana.findMany({
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
      orderBy: {
        createdAt: "asc",
      },
      where: {
        donasiId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success get disbursement data",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error get disbursement data",
      reason: error as Error,
    });
  }
}
