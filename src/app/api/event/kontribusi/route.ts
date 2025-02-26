import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request) {
  try {
    let fixData;
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
          reason: "User not found",
        },
        {
          status: 401,
        }
      );
    }

    if (!page) {
      fixData = await prisma.event_Peserta.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userLoginId,
        },
        select: {
          id: true,
          Event: {
            select: {
              id: true,
              title: true,
              tanggal: true,
              deskripsi: true,
              Author: {
                select: {
                  Profile: true,
                },
              },
              Event_Peserta: {
                take: 5,
                orderBy: {
                  createdAt: "desc",
                },
                select: {
                  id: true,
                  userId: true,
                  User: {
                    select: {
                      Profile: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } else {
      fixData = await prisma.event_Peserta.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userLoginId,
        },
        select: {
          id: true,
          Event: {
            select: {
              id: true,
              title: true,
              tanggal: true,
              deskripsi: true,
              Author: {
                select: {
                  Profile: true,
                },
              },
              Event_Peserta: {
                take: 5,
                orderBy: {
                  createdAt: "desc",
                },
                select: {
                  id: true,
                  userId: true,
                  User: {
                    select: {
                      Profile: true,
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
        message: "Success get kontribusi",
        data: fixData,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error("Error get kontribusi", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed get kontribusi",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
