import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const auth = req.headers.get("Authorization");
  const token = auth?.split(" ")[1];

  console.log("Token received in API Validation:", token , `<<<<<<<<<<<<<<<`);
  console.log("Authorization header:", auth, `<--------`);

  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  return NextResponse.json({ success: true });
}
