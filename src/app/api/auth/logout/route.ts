import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const sessionKey = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
  if (!sessionKey) {
    return NextResponse.json(
      { success: false, message: "Session key tidak ditemukan" },
      { status: 500 }
    );
  }

  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(sessionKey);

  if (!sessionCookie) {
    return NextResponse.json(
      { success: false, message: "Session tidak ditemukan" },
      { status: 400 }
    );
  }

  try {
    // Menghapus cookie dengan set maxAge 0
    cookieStore.set({
      name: sessionKey,
      value: "",
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json({
      success: true,
      message: "Logout berhasil",

    });
  } catch (error) {
    console.error("Gagal menghapus cookie:", error);
    return NextResponse.json(
      { success: false, message: "Gagal melakukan logout" },
      { status: 500 }
    );
  }
}
