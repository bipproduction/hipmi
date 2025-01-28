import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { IEventSponsor } from "@/app_modules/event/_lib/interface";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const method = request.method;
  if (method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const userLoginId = await funGetUserIdByToken();

  if (!userLoginId) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 401 }
    );
  }

  try {
    let fixData;
    const { id } = context.params;
    const req: IEventSponsor = await request.json();

    fixData = await prisma.eventSponsor.create({
      data: {
        eventId: id,
        name: req.name as string,
        fileName: req.fileName as string,
        fileExt: req.fileExt as string,
        fileId: req.fileId as string,
        // authorId: userLoginId,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({
      success: true,
      message: "Success create sponsor",
    });
  } catch (error) {
    await prisma.$disconnect();
    backendLogger.error("Error create sponsor event", error);
    return NextResponse.json(
      { success: false, message: "Failed create sponsor" },
      { status: 500 }
    );
  }
}

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

    fixData = await prisma.eventSponsor.findUnique({
      where: {
        id: id,
      },
      include: {
        Author: {
          include: {
            Profile: true,
          },
        },
      },
    });

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
