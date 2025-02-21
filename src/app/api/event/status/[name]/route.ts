import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
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
    const takeData = 6;
    const skipData = Number(page) * takeData - takeData;

    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data",
          reason: "User Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (!page) {
      fixData = await prisma.event.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          active: true,
          authorId: userLoginId,
          isArsip: false,
        },
        include: {
          EventMaster_Status: true,
        },
      });
    } else {
      const fixStatusName = _.startCase(name);

      fixData = await prisma.event.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          tanggal: "asc",
        },
        where: {
          active: true,
          authorId: userLoginId,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatusName || name,
          },
        },
        include: {
          EventMaster_Status: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Success",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get data event ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
