
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const auth = req.headers.get("Authorization");
  const token = auth?.split(" ")[1];

  console.log("validasi atas", token);

  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  console.log("validasi bawah", token);

  return NextResponse.json({ success: true });
}
