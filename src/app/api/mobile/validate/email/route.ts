import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function POST(request: Request) {
  const { data } = await request.json();
  const  email  = data;

  try {
    const existingEmail = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return NextResponse.json({
        success: false,
        message: "Email telah digunakan",
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Email tidak digunakan",
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal validasi email",
      },
      { status: 500 }
    );
  }
}
