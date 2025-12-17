import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";

export { POST, GET };

async function POST(request: NextRequest) {
  const { data } = await request.json();
  try {
    console.log("Data >>", JSON.stringify(data, null, 2));

    const { userId, platform, deviceId, model, appVersion, fcmToken } = data;

    if (!fcmToken) {
      return NextResponse.json({ error: "Missing Token" }, { status: 400 });
    }

    const existing = await prisma.tokenUserDevice.findFirst({
      where: {
        token: fcmToken,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    let deviceToken;

    if (existing) {
      deviceToken = await prisma.tokenUserDevice.update({
        where: {
          id: existing?.id,
        },
        data: {
          platform,
          deviceId,
          model,
          appVersion,
          isActive: true,
          updatedAt: new Date(),
        },
      });
    } else {
      // Buat baru jika belum ada
      deviceToken = await prisma.tokenUserDevice.create({
        data: {
          token: fcmToken,
          userId: userId,
          platform,
          deviceId,
          model,
          appVersion,
          isActive: true,
        },
      });
    }

    return NextResponse.json({ success: true, data: deviceToken });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function GET(request: NextRequest) {
  try {
    const data = await prisma.tokenUserDevice.findMany({
      where: {
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data });


  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
