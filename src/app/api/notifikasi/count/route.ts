import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const userLoginId = await funGetUserIdByToken();

    const count = await prisma.notifikasi.findMany({
      where: {
        userId: userLoginId,
        isRead: false,
        userRoleId: "1",
      },
    });

    return NextResponse.json({ success: true, data: count.length });
  } catch (error) {
    backendLogger.error("Gagal mendapatkan data count notifikasi", error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
