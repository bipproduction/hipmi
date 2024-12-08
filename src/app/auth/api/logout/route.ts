import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const del = cookies().delete(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);

  return NextResponse.json({ success: true, message: "Logout Berhasil" });
}
