import { prisma } from "@/lib";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { id } = params;
    const data = await prisma.kodeOtp.findFirst({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    backendLogger.error("Error get code otp", error); //(error);
    return NextResponse.json(null, { status: 500 });
  }
}
