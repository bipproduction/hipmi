import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    let fixData;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.user.findMany({
        where: {
          masterUserRoleId: "1",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      });
    } else {
      const getData = await prisma.user.findMany({
        skip: skipData,
        take: takeData,
        orderBy: {
          active: "asc",
        },
        where: {
          masterUserRoleId: "1",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      });

      const nCount = await prisma.user.count({
        where: {
          masterUserRoleId: "1",
          username: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      });

      fixData = {
        data: getData,
        nPage: _.ceil(nCount / takeData),
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
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
