import { prisma } from "@/app/lib";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const data = await prisma.kodeOtp.findFirst({
      where: {
        id: id as string,
      },
    });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify({ data: null }), { status: 404 });
}
