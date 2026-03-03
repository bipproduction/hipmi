import { decrypt } from "@/app/(auth)/_lib/decrypt";
import { prisma } from "@/lib";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const SESSIONKEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
    const TOKENKEY = process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!;
    const cookieStore = cookies();

    const authHeader = req.headers.get("Authorization") || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

    const token = cookieStore.get(SESSIONKEY)?.value || bearerToken;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized token not found",
        },
        { status: 401 }
      );
    }

    const decrypted = await decrypt({
      token,
      encodedKey: TOKENKEY,
    });

    if (!decrypted?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: invalid token data",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decrypted.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );
    }

    if (!user.active) {
      return NextResponse.json(
        {
          success: false,
          message: "User belum aktif",
          data: user,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      data: user,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack';
    
    // Log detailed error for debugging
    console.error("❌ [USER-VALIDATE] Error:", errorMsg);
    console.error("❌ [USER-VALIDATE] Stack:", errorStack);
    console.error("❌ [USER-VALIDATE] Time:", new Date().toISOString());
    
    // Check if it's a database connection error
    if (errorMsg.includes("Prisma") || errorMsg.includes("database") || errorMsg.includes("connection")) {
      console.error("❌ [USER-VALIDATE] Database connection error detected!");
      console.error("❌ [USER-VALIDATE] DATABASE_URL exists:", !!process.env.DATABASE_URL);
    }
    
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error: process.env.NODE_ENV === 'development' ? errorMsg : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
