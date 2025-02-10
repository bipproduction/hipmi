import { sessionCreate } from "@/app/(auth)/_lib/session_create";
import prisma from "@/app/lib/prisma";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const { nomor } = await req.json();
    const dataUser = await prisma.user.findUnique({
      where: {
        nomor: nomor,
      },
      select: {
        id: true,
        nomor: true,
        username: true,
        active: true,
        masterUserRoleId: true,
      },
    });

    if (dataUser == null)
      return NextResponse.json(
        { success: false, message: "Nomor Belum Terdaftar" },
        { status: 200 }
      );

    const token = await sessionCreate({
      sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
      user: dataUser as any,
    });

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Gagal membuat session" },
        { status: 500 }
      );
    }
    // Buat response dengan token dalam cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Berhasil Login",
        roleId: dataUser.masterUserRoleId,
        active: dataUser.active,
      },
      { status: 200 }
    );

    // Set cookie dengan token yang sudah dipastikan tidak null
    response.cookies.set(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!, token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 hari dalam detik (1 bulan)
    });

    return response;
  } catch (error) {
    backendLogger.log("API Error or Server Error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Maaf, Terjadi Keselahan",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
