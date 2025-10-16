import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { GET };

async function GET(request: Request, { params }: { params: { name: string } }) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let fixData;

  try {
    if (category === "dashboard") {
      const publish = await prisma.projectCollaboration.count({
        where: {
          isActive: true,
          isReject: false,
          Author: {
            active: true,
          },
        },
      });

      const reject = await prisma.projectCollaboration.count({
        where: {
          isActive: false,
          isReject: true,
          Author: {
            active: true,
          },
        },
      });

      const group = await prisma.projectCollaboration_RoomChat.count({
        where: {
          isActive: true,
        },
      });

      fixData = {
        publish: publish,
        reject: reject,
        group: group,
      };
    } else if (category === "publish") {
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
    } else if (category === "reject") {
      fixData = await prisma.projectCollaboration.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: false,
          isReject: true,
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
    } else if (category === "group") {
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
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data collaboration",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error get data collaboration",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
