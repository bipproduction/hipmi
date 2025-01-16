import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  if (request.method === "GET") {
    try {
      let fixData;
      const { id } = context.params;
      const { searchParams } = new URL(request.url);
      const kategori = searchParams.get("kategori");
      const page = searchParams.get("page");
      const takeData = 10;
      const skipData = Number(page) * takeData - takeData;

      if (kategori == null) {
        fixData = await prisma.dokumenInvestasi.findFirst({
          where: {
            id: id,
          },
        });
      } else if (kategori == "get-all") {
        fixData = await prisma.dokumenInvestasi.findMany({
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
        { success: true, message: "Success get data document", data: fixData },
        { status: 200 }
      );
    } catch (error) {
      backendLogger.error("Error get data document", error);
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
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
