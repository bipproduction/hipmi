import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  // if (request.method === "GET") {
  //   return NextResponse.json(
  //     { success: false, message: "Method not allowed" },
  //     { status: 405 }
  //   );
  // }

  try {
    let fixData;
    const { id } = context.params;
    const { searchParams } = new URL(request.url);
    const kategori: string | null = searchParams.get("kategori");
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    if (!kategori) {
      fixData = await prisma.beritaInvestasi.findFirst({
        where: {
          id: id,
        },
        include: {
          investasi: {
            select: {
              authorId: true,
            },
          },
        },
      });
    } else if (kategori == "get-all") {
      fixData = await prisma.beritaInvestasi.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          investasiId: id,
          active: true,
        },
      });
    }

    await prisma.$disconnect();

    return NextResponse.json(
      { success: true, message: "Success get data news", data: fixData },
      { status: 200 }
    );
  } catch (error) {
    await prisma.$disconnect();
    backendLogger.error("Error get data news", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get data, try again later",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function main({ id }: { id: string }) {
  const fixData = await prisma.beritaInvestasi.findMany({
    take: 10,
    skip: 0,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      investasiId: id.trim(),
      active: true,
    },
  });
  console.log("data sebelum disconnect>>", fixData);
}
