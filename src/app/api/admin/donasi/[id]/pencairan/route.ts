import prisma from "@/lib/prisma";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  
  let fixData;
  const donasiId = params.id;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const takeData = 10
  const skipData = Number(page) * takeData - takeData;

  try {
    if (!page) {
      fixData = await prisma.donasi_PencairanDana.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          donasiId: donasiId,
        },
      });
    } else {
      const data = await prisma.donasi_PencairanDana.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          donasiId: donasiId,
        },
      });

      const nCount = await prisma.donasi_PencairanDana.count({
        where: {
          donasiId: donasiId,
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json({
      success: true,
      message: "Data berhasil diambil",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get pencairan donasi >>", error);
    return NextResponse.json({
      success: false,
      message: "Error get pencairan donasi",
      reason: (error as Error).message,
    });
  }
}
