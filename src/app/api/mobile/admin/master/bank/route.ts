import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";
import { NextResponse } from "next/server";

export { GET, POST };

async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const takeData = PAGINATION_DEFAULT_TAKE;
    const skipData = page * takeData - takeData;

    const data = await prisma.masterBank.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
    });

    return NextResponse.json(
      { success: true, message: "Berhasil mendapatkan data", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Get Master Bank >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "API Error Get Data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function POST(request: Request) {
  const { data } = await request.json();
  try {
    const count = await prisma.masterBank.count();
    const createNewId = count + 1;

    const create = await prisma.masterBank.create({
      data: {
        id: createNewId.toString(),
        namaBank: data.namaBank,
        namaAkun: data.namaAkun,
        norek: data.norek,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil menambahkan data",
      data: create,
    });
  } catch (error) {
    console.error("Error Post Master Bank >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Post Data",
      reason: (error as Error).message,
    });
  }
}
