import { prisma } from "@/lib";
import _ from "lodash";
import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  let fixData;
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender");
  const page = searchParams.get("page");
  const dataTake = 10;
  const dataSkip = Number(page) * dataTake - dataTake;

  try {
    if (!page) {
      // Without page
      const getData = await prisma.sticker.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isActive: true,
          jenisKelamin: {
            mode: "insensitive",
            contains: gender ?? "",
          },
        },
        include: {
          MasterEmotions: true,
        },
      });

      fixData = {
        data: getData,
      };
    } else {
      // With page
      const data = await prisma.sticker.findMany({
        skip: dataSkip,
        take: dataTake,
        where: {
          isActive: true,
          jenisKelamin: {
            mode: "insensitive",
            contains: gender ?? "",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          MasterEmotions: true,
        },
      });

      const nCount = await prisma.sticker.count({
        where: {
          isActive: true,
          jenisKelamin: {
            mode: "insensitive",
            contains: gender ?? "",
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / dataTake),
      };
    }

    return NextResponse.json(
      { success: true, message: "Success get data sticker", res: fixData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get data sticker", error);
    return NextResponse.json(
      { success: false, message: "Error get data sticker" },
      { status: 500 }
    );
  }
}
