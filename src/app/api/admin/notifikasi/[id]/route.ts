import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, POST };
async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    let fixData;
    const { id } = params;
    const userLoginId = id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID not provided" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const takeData = 10;
    const skipData = Number(page) * takeData - takeData;

    if (!page) {
      fixData = await prisma.notifikasi.findMany({
        orderBy: [
          {
            isRead: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
        where: {
          adminId: userLoginId,
          userRoleId: "2",
        },
      });
    } else {
      fixData = await prisma.notifikasi.findMany({
        take: takeData,
        skip: skipData,
        orderBy: [
          {
            isRead: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
        where: {
          adminId: id,
          userRoleId: "2",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data fetched successfully",
      data: fixData,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const userLoginId = id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID not provided" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const updatedData = await prisma.notifikasi.updateMany({
      where: {
        adminId: userLoginId,
      },
      data: {
        isRead: data.isRead,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notification updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update notification" },
      { status: 500 }
    );
  }
}
