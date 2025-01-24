import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { IEventSponsor } from "@/app_modules/event/_lib/interface";
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
        auhtorId: userLoginId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Success create sponsor",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed create sponsor" },
      { status: 500 }
    );
  }
}
