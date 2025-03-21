import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const takeData = 10;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;

    if (!page) {
      fixData = await prisma.projectCollaboration.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          isReject: false,
          Author: {
            active: true,
          },
        },
        select: {
          id: true,
          createdAt: true,
          isActive: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
          projectCollaborationMaster_IndustriId: true,
          ProjectCollaborationMaster_Industri: true,
          ProjectCollaboration_Partisipasi: {
            where: {
              User: {
                active: true,
              },
            },
            // select: {
            //   User: {
            //     select: {
            //       id: true,
            //       username: true,
            //       Profile: true,
            //     },
            //   },
            // },
          },
        },
      });
    } else {
      const data = await prisma.projectCollaboration.findMany({
        skip: skipData,
        take: takeData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          isReject: false,
          Author: {
            active: true,
          },
        },
        select: {
          id: true,
          createdAt: true,
          isActive: true,
          title: true,
          Author: {
            select: {
              id: true,
              username: true,
              Profile: true,
            },
          },
          projectCollaborationMaster_IndustriId: true,
          ProjectCollaborationMaster_Industri: true,
          ProjectCollaboration_Partisipasi: {
            where: {
              User: {
                active: true,
              },
            },
            // select: {
            //   User: {
            //     select: {
            //       id: true,
            //       username: true,
            //       Profile: true,
            //     },
            //   },
            // },
          },
        },
      });

      const nCount = await prisma.projectCollaboration.count({
        where: {
          isActive: true,
          isReject: false,
          Author: {
            active: true,
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / takeData),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data collaboration dashboard",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data collaboration dashboard >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data collaboration dashboard",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
