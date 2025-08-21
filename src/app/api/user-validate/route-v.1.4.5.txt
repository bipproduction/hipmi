import { decrypt } from "@/app/(auth)/_lib/decrypt";
import { prisma } from "@/lib";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const SESSIONKEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
    // const token = req.headers.get("Authorization")?.split(" ")[1]
    const token =
      cookies().get(SESSIONKEY)?.value ||
      req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized token not found",
        },
        { status: 401 }
      );
    }

    const decripted = await decrypt({
      token: token!,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    });

    if (!decripted) {
      await prisma.$disconnect();
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decripted.id,
      },
    });

    // Disconnect after successful query

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: user,
    });
  } catch (error) {
    // Ensure connection is closed even if error occurs

    console.error("Error in user validation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
