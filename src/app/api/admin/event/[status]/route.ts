import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { status: string } }
) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { status } = params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 1;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;
    const fixStatus = _.startCase(status);

    if (!page && !search) {
      fixData = await prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
        },
      });
    } else if (!page && search) {
      fixData = await prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });
    } else if (page && !search) {
      const data = await prisma.event.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
        },
      });

      const nCount = await prisma.event.count({
        where: {
          active: true,
          eventMaster_StatusId: "1",
          isArsip: false,
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    } else if (page && search) {
      const data = await prisma.event.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          active: true,
          isArsip: false,
          EventMaster_Status: {
            name: fixStatus,
          },
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      const nCount = await prisma.event.count({
        where: {
          active: true,
          eventMaster_StatusId: "1",
          isArsip: false,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json({
      success: true,
      message: `Success get data table event ${status}`,
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get data table event dashboard >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed get data table event dashboard",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
