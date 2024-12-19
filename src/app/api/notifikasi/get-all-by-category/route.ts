import { prisma } from "@/app/lib";
import { newFunGetUserId } from "@/app/lib/new_fun_user_id";
import { ICategoryapp } from "@/app_modules/notifikasi/model/interface";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as ICategoryapp;
    const page = searchParams.get("page");

    const userLoginId = await newFunGetUserId();
    const fixPage = _.toNumber(page);
    const takeData = 10;
    const skipData = fixPage * takeData - takeData;

    if (category === "Semua") {
      fixData = await prisma.notifikasi.findMany({
        take: takeData,
        skip: skipData,
        orderBy: [
          {
            isRead: "asc",
          },
          { createdAt: "desc" },
        ],
        where: {
          userId: userLoginId,
          userRoleId: "1",
        },
      });
    } else {
      fixData = await prisma.notifikasi.findMany({
        take: takeData,
        skip: skipData,
        orderBy: [
          {
            isRead: "asc",
          },
          { createdAt: "desc" },
        ],
        where: {
          userId: userLoginId,
          userRoleId: "1",
          kategoriApp: _.upperCase(category),
        },
      });
    }

    return NextResponse.json(
      { success: true, data: fixData, message: "Berhasil mendapatkan data" },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get data notifikasi: " + error);
    return NextResponse.json(
      { success: false, message: "Gagal mendapatkan data" },
      { status: 500 }
    );
  }
}
