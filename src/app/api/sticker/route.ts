import { prisma } from "@/lib";
import { data } from "autoprefixer";
import _ from "lodash";
import { NextResponse } from "next/server";

export { GET, POST };

interface IPostSticker {
  fileId: string;
  emotions: string[];
}

async function POST(request: Request) {
  const method = request.method;
  if (method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { fileId, emotions } = await request.json();

    const newStiker = await prisma.sticker.create({
      data: {
        fileId,
        MasterEmotions: {
          connect: emotions.map((value: string) => ({ value })), // id = number[]
        },
      },
    });

    if (!newStiker) {
      return NextResponse.json(
        { success: false, message: "Gagal membuat stiker" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Berhasil membuat stiker" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error create sticker", error);
    return NextResponse.json(
      { success: false, message: "Failed to create sticker" },
      { status: 500 }
    );
  }
}

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
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const dataTake = 10
  const dataSkip = Number(page) * dataTake - dataTake;

  try {
    if (!page) {
      fixData = await prisma.sticker.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          MasterEmotions: true,
        },
      });
    } else {
      const data = await prisma.sticker.findMany({
        skip: dataSkip,
        take: dataTake,
        where: {
          MasterEmotions: {
            some: {
              value: {
                contains: search ? search : "",
                mode: "insensitive",
              },
            },
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
          MasterEmotions: {
            some: {
              value: {
                contains: search ? search : "",
                mode: "insensitive",
              },
            },
          },
        },
      });

      fixData = {
        data: data,
        nPage: _.ceil(nCount / dataTake),
      };
    }

    return NextResponse.json(
      { success: true, message: "Success get data sticker", data: fixData },
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
