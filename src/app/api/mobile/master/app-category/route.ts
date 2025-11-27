import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET };

async function GET(request: Request) {
  try {
    const data = await prisma.masterKategoriApp.findMany({
      where: {
        isActive: true,
      },
    });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR GET APP CATEGORY] >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error",
      reason: (error as Error).message || error,
    });
  }
}
