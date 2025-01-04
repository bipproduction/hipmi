import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let fixData
    const userLoginId = await funGetUserIdByToken();

    if (userLoginId == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data, user id tidak ada",
        },
        { status: 500 }
      );
    }

    const activationUser = await prisma.user.findFirst({
      where: {
        id: userLoginId,
      },
      select: {
        active: true,
      },
    });

    fixData = activationUser?.active

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get activation user: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
