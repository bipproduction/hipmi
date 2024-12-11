import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const auth = req.headers.get("Authorization");
  const token = auth?.split(" ")[1];
  if (!token) return NextResponse.json({ success: false }, { status: 401 });
  return NextResponse.json({ success: true });

}
