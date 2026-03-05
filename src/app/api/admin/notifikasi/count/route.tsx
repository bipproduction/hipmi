import { NextResponse } from "next/server";
import { withRetry } from "@/lib/prisma-retry";
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

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const data = await withRetry(
      () =>
        prisma.notifikasi.count({
          where: {
            adminId: userId,
            userRoleId: "2",
            isRead: false,
          },
        }),
      undefined,
      "countAdminNotifications"
    );

    return NextResponse.json(
      {
        success: true,
        message: "Data fetched successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error get count notifikasi", error);

    // Check if it's a database connection error
    if (
      errorMsg.includes("Prisma") ||
      errorMsg.includes("database") ||
      errorMsg.includes("connection")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Database connection error. Please try again.",
          data: null,
        },
        { status: 503 }
      );
    }

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
