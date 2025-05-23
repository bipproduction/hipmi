import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/(auth)/_lib/decrypt";

export async function GET() {
  const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY;

  if (!SESSION_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Session key not configured",
        message: "Session key not configured",
      },
      { status: 500 }
    );
  }

  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "No token found", message: "No token found" },
      { status: 401 }
    );
  }

  try {
    const decoded = await decrypt({
      token,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    });

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token", message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil mendapatkan data",
      userId: decoded.id,
    });
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to decode token",
        message: "Failed to decode token",
      },
      { status: 500 }
    );
  }
}
