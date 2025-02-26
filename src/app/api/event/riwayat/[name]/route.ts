import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

interface Props {
  params: { name: string };
}
async function GET(request: Request, { params }: Props) {
  try {
    let fixData;
    const { name } = params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 5;
    const skipData = Number(page) * takeData - takeData;

    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mendapatkan data",
          reason: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (!page) {
      if (name == "saya") {
        fixData = await prisma.event.findMany({
          orderBy: {
            tanggal: "desc",
          },
          where: {
            authorId: userLoginId,
            eventMaster_StatusId: "1",
            isArsip: true,
          },
          select: {
            id: true,
            title: true,
            tanggal: true,
            deskripsi: true,
            active: true,
            authorId: true,
            Author: {
              select: {
                Profile: true,
              },
            },
          },
        });
      } else if (name === "semua") {
        fixData = await prisma.event.findMany({
          orderBy: {
            tanggal: "desc",
          },
          where: {
            eventMaster_StatusId: "1",
            isArsip: true,
          },
          select: {
            id: true,
            title: true,
            tanggal: true,
            deskripsi: true,
            active: true,
            authorId: true,
            Author: {
              select: {
                Profile: true,
              },
            },
          },
        });
      }
    } else {
      if (name == "saya") {
        fixData = await prisma.event.findMany({
          take: takeData,
          skip: skipData,
          orderBy: {
            tanggal: "desc",
          },
          where: {
            authorId: userLoginId,
            eventMaster_StatusId: "1",
            isArsip: true,
          },
          select: {
            id: true,
            title: true,
            tanggal: true,
            deskripsi: true,
            active: true,
            authorId: true,
            Author: {
              select: {
                Profile: true,
              },
            },
          },
        });
      } else if (name === "semua") {
        fixData = await prisma.event.findMany({
          take: takeData,
          skip: skipData,
          orderBy: {
            tanggal: "desc",
          },
          where: {
            eventMaster_StatusId: "1",
            isArsip: true,
          },
          select: {
            id: true,
            title: true,
            tanggal: true,
            deskripsi: true,
            active: true,
            authorId: true,
            Author: {
              select: {
                Profile: true,
              },
            },
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: fixData,
    });
  } catch (error) {
    backendLogger.error("Error get riwayat", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error get data",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
