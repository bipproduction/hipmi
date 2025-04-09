import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log("Token received in API Validation:", token, `<<<<<<<<<<<<<<<`);

  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  return NextResponse.json({ success: true });
}
