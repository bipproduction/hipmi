import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export { POST };

async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const existingEmail = await prisma.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingEmail) {
      return NextResponse.json({
        success: false,
        message: "Email telah digunakan",
        status: 400,
      });
    }

    const create = await prisma.profile.create({
      data: {
        userId: data.id,
        name: data.name,
        email: data.email,
        alamat: data.alamat,
        jenisKelamin: data.jenisKelamin,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Create profile success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Create profile failed",
      },
      { status: 500 }
    );
  }
}
