import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let fixData;
  try {
    if (category === "publish") {
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
