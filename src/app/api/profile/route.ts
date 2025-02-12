
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export { POST };

async function POST(request: Request) {
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
    const { data } = await request.json();
    const userLoginId = await funGetUserIdByToken();

    if (!userLoginId) {
      backendLogger.error("User tidak terautentikasi");
      return NextResponse.json(
        {
          success: false,
          message: "User tidak terautentikasi",
        },
        { status: 400 }
      ); // Validasi user login
    }

    const existingEmail = await prisma.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email telah digunakan",
        },
        { status: 409 }
      );
    }

    const createProfile = await prisma.profile.create({
      data: {
        userId: userLoginId,
        name: data.name,
        email: data.email,
        alamat: data.alamat,
        jenisKelamin: data.jenisKelamin,
        imageId: data.imageId,
        imageBackgroundId: data.imageBackgroundId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil membuat profile",
        data: createProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    backendLogger.error("Error create profile", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat profile",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
