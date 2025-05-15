import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const response = await prisma.masterEmotions.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        isActive: true,
      },
    });
    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching master emotions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch master emotions" },
      { status: 500 }
    );
  }
}
