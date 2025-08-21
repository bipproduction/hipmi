import { prisma } from "@/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { ICategoryapp } from "@/app_modules/notifikasi/model/interface";
import backendLogger from "@/util/backendLogger";
import _ from "lodash";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    let fixData;
    const { name } = params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    if (!page) {
      fixData = await prisma.notifikasi.findMany({
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
      const fixNameKategori = _.startCase(name);
      if (fixNameKategori === "Semua") {
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
            kategoriApp: _.upperCase(name),
          },
        });
      }
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
