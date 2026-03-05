import { withRetry } from "@/lib/prisma-retry";
import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("User ID:", id);

  try {
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    const data = await withRetry(
      () =>
        prisma.notifikasi.count({
          where: {
            recipientId: id,
            isRead: false,
          },
        }),
      undefined,
      "countUnreadNotifications"
    );

    console.log("List Notification >>", data);

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error getting unread count:", error);

    // Check if it's a database connection error
    if (
      errorMsg.includes("Prisma") ||
      errorMsg.includes("database") ||
      errorMsg.includes("connection")
    ) {
      return NextResponse.json({
        success: false,
        message: "Database connection error. Please try again.",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Failed to get unread count",
    });
  }
}
