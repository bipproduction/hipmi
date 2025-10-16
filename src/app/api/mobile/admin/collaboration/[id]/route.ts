import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, PUT };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let fixData;
  try {
    if (category === "publish" || category === "reject") {
      fixData = await prisma.projectCollaboration.findUnique({
        where: {
          id: id,
        },
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
              username: true,
            },
          },
          ProjectCollaborationMaster_Industri: true,
          ProjectCollaboration_Partisipasi: {
            where: {
              User: {
                active: true,
              },
            },
            select: {
              id: true,
              User: {
                select: {
                  id: true,
                  Profile: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } else if (category === "group") {
      fixData = await prisma.projectCollaboration_RoomChat.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          ProjectCollaboration: {
            select: {
              id: true,
              isActive: true,
              title: true,
              lokasi: true,
              purpose: true,
              benefit: true,
              createdAt: true,
              ProjectCollaborationMaster_Industri: true,
              Author: true,
            },
          },
          ProjectCollaboration_AnggotaRoomChat: {
            select: {
              User: {
                select: {
                  username: true,
                  id: true,
                  Profile: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
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

async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await request.json();
  // const {searchParams} = new URL(request.url);
  // const status = searchParams.get("status");

  try {
    const projectUpdate = await prisma.projectCollaboration.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
        isReject: true,
        report: data,
      },
      select: {
        userId: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Success update data collaboration",
        // data: projectUpdate,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error update data collaboration",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
