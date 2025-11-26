import _ from "lodash";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { POST };

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
