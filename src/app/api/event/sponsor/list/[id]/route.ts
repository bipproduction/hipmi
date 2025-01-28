import { prisma } from "@/app/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    let fixData;
    const { id } = context.params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.eventSponsor.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          eventId: id,
        },
        include: {
          Author: {
            include: {
              Profile: true,
            },
          },
        },
      });
    } else {
      fixData = await prisma.eventSponsor.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          eventId: id,
        },
        include: {
          Author: {
            include: {
              Profile: true,
            },
          },
        },
      });
    }

    await prisma.$disconnect();
    return NextResponse.json({
      success: true,
      message: "Success create sponsor",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get sponsor event", error);
    await prisma.$disconnect();
    return NextResponse.json(
      {
        success: false,
        message: "Failed create sponsor",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
