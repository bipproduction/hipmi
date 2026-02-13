import { prisma } from "@/lib";
import { PAGINATION_DEFAULT_TAKE } from "@/lib/constans-value/constansValue";
import { NextResponse } from "next/server";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  let fixData;
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subBidangId = searchParams.get("subBidangId");

    const page = Number(searchParams.get("page")) || 1;
    const takeData = PAGINATION_DEFAULT_TAKE;
    const skipData = page * takeData - takeData;

    if (category === "all") {
      const bidang = await prisma.masterBidangBisnis.findUnique({
        where: {
          id: id,
        },
      });
      const subBidang = await prisma.masterSubBidangBisnis.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterBidangBisnisId: id,
        },
      });

      fixData = {
        bidang,
        subBidang,
      };
    } else if (category === "bidang") {
      const bidang = await prisma.masterBidangBisnis.findUnique({
        where: {
          id: id,
        },
      });

      fixData = bidang;
    } else if (category === "sub-bidang") {
      const subBidang = await prisma.masterSubBidangBisnis.findUnique({
        where: {
          id: subBidangId as any,
        },
      });

      fixData = subBidang;
    } else if (category === "only-sub-bidang") {
      const subBidang = await prisma.masterSubBidangBisnis.findMany({
        where: {
          masterBidangBisnisId: id,
        },
        take: takeData,
        skip: skipData,
      });

      fixData = subBidang;
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    console.error("Error Get Master Bank >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Get Data",
      reason: (error as Error).message,
    });
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    if (category === "bidang") {
      const updateData = await prisma.masterBidangBisnis.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          active: data.active,
        },
      });
    } else if (category === "sub-bidang") {
      const updateData = await prisma.masterSubBidangBisnis.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          isActive: data.isActive,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Berhasil mengupdate data",
    });
  } catch (error) {
    console.error("Error Update Master Bank >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "API Error Update Data",
      reason: (error as Error).message,
    });
  }
}
