import { prisma } from "@/app/lib";
import { data } from "autoprefixer";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");

  try {
    const data = await prisma.kodeOtp.findFirst({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(null, { status: 500 });
}
