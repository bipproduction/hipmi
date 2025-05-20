import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const method = request.method;
  if (method !== "GET") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    const data = await prisma.notifikasi.count({
      where: {
        adminId: userId,
        userRoleId: "2",
        isRead: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data fetched successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error get count notifikasi", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get count notifikasi",
        data: null,
      },
      { status: 500 }
    );
  }
}
