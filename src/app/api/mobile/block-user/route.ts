import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST, GET };

async function POST(request: Request) {
  const { data } = await request.json();

  console.log("data >>", data);
  console.log("menuFeature masuk>>", data.menuFeature);

  try {
    const nameApp = _.lowerCase(data.menuFeature);
    const menuFeature = await prisma.masterKategoriApp.findFirst({
      where: { value: nameApp },
      select: {
        id: true,
      },
    });

    console.log(" fix menuFeature >>", menuFeature);

    const blockUser = await prisma.blockedUser.create({
      data: {
        blockerId: data.blockerId,
        blockedId: data.blockedId,
        menuFeatureId: menuFeature?.id as any,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "success",
      // data: blockUser,
    });
  } catch (error) {
    console.log("[ERROR BLOCK USER] >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error",
      reason: (error as Error).message || error,
    });
  }
}

async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const page = Number(searchParams.get("page"));
  const search = searchParams.get("search");

  const takeData = 10;
  const skipData = page * takeData - takeData;

  try {
    const data = await prisma.blockedUser.findMany({
      take: page ? takeData : undefined,
      skip: page ? skipData : undefined,
      where: {
        blockerId: id as any,
        menuFeature: {
          id: {
            contains: search || "",
            mode: "insensitive",
          },
        },
      },
      select: {
        id: true,
        blocked: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                imageId: true,
              },
            },
          },
        },
        menuFeature: {
          select: {
            name: true,
            value: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR GET BLOCK USER] >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error",
      reason: (error as Error).message || error,
    });
  }
}
