import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const dataTake = 10;
    const dataSkip = Number(page) * dataTake - dataTake;

    if (!page) {
      fixData = await prisma.user.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterUserRoleId: "2",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      });
    } else {
      const data = await prisma.user.findMany({
        skip: dataSkip,
        take: dataTake,
        orderBy: {
          updatedAt: "desc",
        },
        where: {
          masterUserRoleId: "2",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      });

      const nCount = await prisma.user.count({
        where: {
          masterUserRoleId: "2",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / dataTake),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success get data",
        data: fixData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error get data admin", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        reason: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
