import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export { GET, DELETE };

async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("[ID] >>", id);
  
  try {
    const data = await prisma.blockedUser.findUnique({
      where: {
        id: id,
      },
      select: {
        blocked: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                id: true,
                imageId: true,
              },
            },
          },
        },
        menuFeature: {
          select: {
            name: true,
            value: true,
          },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR GET BLOCK USER] >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error",
      reason: (error as Error).message || error,
    });
  }
}

async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("[ID] >>", id);
  
  try {
    const data = await prisma.blockedUser.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log("[ERROR DELETE BLOCK USER] >>", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error",
      reason: (error as Error).message || error,
    });
  }
}
