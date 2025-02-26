import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";
export const dynamic = "force-dynamic";


export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const dataTake = 5;
    const dataSkip = Number(page) * dataTake - dataTake;

    if (!page) {
      fixData = await prisma.job.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterStatusId: "1",
          isActive: true,
          isArsip: false,
          title: {
            mode: "insensitive",
            contains: search ? search : "",
          },
        },
        select: {
          id: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
        },
      });
    } else {
      fixData = await prisma.job.findMany({
        take: dataTake,
        skip: dataSkip,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterStatusId: "1",
          isActive: true,
          isArsip: false,
          title: {
            mode: "insensitive",
            contains: search ? search : "",
          },
        },
        select: {
          id: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get data job");
    return NextResponse.json({
      success: false,
      message: "Error get data job",
      error: (error as Error).message,
    });
  }
}
