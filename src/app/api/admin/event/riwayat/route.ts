import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;

    if (!page && !search) {
      fixData = await prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          EventMaster_Status: {
            name: "Publish",
          },
          isArsip: true,
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          EventMaster_Status: true,
          EventMaster_TipeAcara: true,
        },
      });
    } else if (!page && search) {
      fixData = await prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          EventMaster_Status: {
            name: "Publish",
          },
          isArsip: true,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          EventMaster_Status: true,
          EventMaster_TipeAcara: true,
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
          EventMaster_Status: {
            name: "Publish",
          },
          isArsip: true,
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          EventMaster_Status: true,
          EventMaster_TipeAcara: true,
        },
      });

      const nCount = await prisma.event.count({
        where: {
          active: true,
          isArsip: true,
          EventMaster_Status: {
            name: "Publish",
          },
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
          EventMaster_Status: {
            name: "Publish",
          },
          isArsip: true,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        include: {
          Author: {
            select: {
              id: true,
              username: true,
              Profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          EventMaster_Status: true,
          EventMaster_TipeAcara: true,
        },
      });

      const nCount = await prisma.event.count({
        where: {
          active: true,
          isArsip: true,
          EventMaster_Status: {
            name: "Publish",
          },
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data riwayat event",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data riwayat event >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data riwayat event",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
