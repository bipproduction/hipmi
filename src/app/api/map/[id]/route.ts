import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { POST };

async function POST(request: Request, { params }: { params: { id: string } }) {
  if (request.method !== "POST") {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  try {
    const userLoginId = await funGetUserIdByToken();
    if (!userLoginId) {
      return NextResponse.json(
        {
          success: false,
          message: "User tidak ditemukan",
        },
        { status: 401 }
      );
    }

    const { id } = params;
    const { data } = await request.json();

    const created = await prisma.businessMaps.create({
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        namePin: data.namePin,
        imageId: data.imageId,
        portofolioId: id,
        authorId: userLoginId,
      },
    });

    if (!created) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal membuat pin map",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil membuat portofolio",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    backendLogger.error("Error create pin map", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat pin map",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
