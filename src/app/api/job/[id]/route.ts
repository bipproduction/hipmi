import { NextResponse } from "next/server";

export { GET };

async function GET(request: Request) {
  return NextResponse.json({
    success: true,
  });
}
