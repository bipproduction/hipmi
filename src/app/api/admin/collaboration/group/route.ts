import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const takeData = 1;
  const skipData = Number(page) * takeData - takeData;

  try {
    let fixData;

    if (!page) {
      fixData = await prisma.projectCollaboration_RoomChat.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
        },
        select: {
          id: true,
          createdAt: true,
          isActive: true,
          name: true,
          ProjectCollaboration_AnggotaRoomChat: {
            select: {
              User: {
                select: {
                  id: true,
                  Profile: true,
                },
              },
            },
          },
          ProjectCollaboration: {
            select: {
              id: true,
              isActive: true,
              title: true,
              lokasi: true,
              purpose: true,
              benefit: true,
              createdAt: true,
              report: true,
              Author: {
                select: {
                  id: true,
                  Profile: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              ProjectCollaborationMaster_Industri: true,
            },
          },
        },
      });
    } else {
      const data = await prisma.projectCollaboration_RoomChat.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
        },
        select: {
          id: true,
          createdAt: true,
          isActive: true,
          name: true,
          ProjectCollaboration_AnggotaRoomChat: {
            select: {
              User: {
                select: {
                  id: true,
                  Profile: true,
                },
              },
            },
          },
          ProjectCollaboration: {
            select: {
              id: true,
              isActive: true,
              title: true,
              lokasi: true,
              purpose: true,
              benefit: true,
              createdAt: true,
              report: true,
              Author: {
                select: {
                  id: true,
                  Profile: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              ProjectCollaborationMaster_Industri: true,
            },
          },
        },
      });

      const nCount = await prisma.projectCollaboration_RoomChat.count({
        where: {
          isActive: true,
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
        message: "Success get data collaboration group",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data collaboration group >>", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data collaboration group",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
