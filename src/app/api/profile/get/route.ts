import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log(await req.json())
  return NextResponse.json({status: 200})
}
