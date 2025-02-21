import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export { GET };

async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const dataTake = 10
    const dataSkip = Number(page) * dataTake - dataTake;

    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data",
          reason: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (!page) {
      fixData = await prisma.job.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterStatusId: "1",
          isActive: true,
          isArsip: true,
          authorId: userLoginId,
        },
        select: {
          id: true,
          title: true,
          isArsip: true,
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
          isArsip: true,
          authorId: userLoginId,
        },
        select: {
          id: true,
          title: true,
          isArsip: true,
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
