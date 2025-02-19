import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    let fixData;
    const { name } = params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 10
    const skipData = Number(page) * takeData - takeData;

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
          authorId: userLoginId,
          isActive: true,
          isArsip: false,
        },
        include: {
          Author: true,
          MasterStatus: true,
        },
      });
    } else {
      const fixStatusName = _.startCase(name);
      fixData = await prisma.job.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          authorId: userLoginId,
          isActive: true,
          MasterStatus: {
            name: fixStatusName || name,
          },
        },
        include: {
          Author: true,
          MasterStatus: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error Get Data Job", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
