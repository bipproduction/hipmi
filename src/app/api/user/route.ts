import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      {
        status: 405,
      }
    );
  }

  try {
    let fixData;
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

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 15;
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          MasterUserRole: {
            name: "User",
          },
          active: true,
          NOT: {
            Profile: null,
          },
          Profile: {
            name: {
              contains: search ? search : "",
              mode: "insensitive",
            },
          },
        },
        include: {
          Profile: {
            select: {
              id: true,
              name: true,
              imageId: true,
            },
          },
        },
      });
    } else {
      fixData = await prisma.user.findMany({
        take: takeData,
        skip: skipData,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          MasterUserRole: {
            name: "User",
          },
          active: true,
          Profile: {
            name: {
              contains: search ? search : "",
              mode: "insensitive",
            },
          },
          NOT: {
            Profile: null,
          },
          // OR: [
          //   {
          //     NOT: {
          //       id: userLoginId as string,
          //     },
          //   },
          // ],
        },
        include: {
          Profile: {
            select: {
              id: true,
              name: true,
              imageId: true,
            },
          },
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mendapatkan data",
        data: fixData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mendapatkan data",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
