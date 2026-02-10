import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";

export { POST, GET };

async function POST(request: NextRequest) {
  try {
    // Parse the request body - can accept either nested under 'data' or directly
    const requestBody = await request.json();
    
    // Check if the data is nested under 'data' property (as described in the issue)
    // or if it's directly in the request body (more common pattern)
    const payload = requestBody.data ? requestBody.data : requestBody;
    
    const { userId, platform, deviceId, model, appVersion, fcmToken } = payload;

    // Validate required fields
    if (!fcmToken) {
      return NextResponse.json(
        { error: "Missing FCM token", field: "fcmToken" }, 
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Missing user ID", field: "userId" }, 
        { status: 400 }
      );
    }

    // Verify that the user exists before creating/updating the device token
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found", field: "userId" }, 
        { status: 404 }
      );
    }

    const existing = await prisma.tokenUserDevice.findFirst({
      where: {
        token: fcmToken,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    console.log("✅ EX", existing);

    let deviceToken;

    if (existing) {
      deviceToken = await prisma.tokenUserDevice.update({
        where: {
          id: existing.id,
        },
        data: {
          platform,
          deviceId,
          model,
          appVersion,
          isActive: true,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new device token record
      deviceToken = await prisma.tokenUserDevice.create({
        data: {
          token: fcmToken,
          userId: userId,
          platform,
          deviceId,
          model,
          appVersion,
          isActive: true,
        },
      });
    }

    return NextResponse.json({ success: true, data: deviceToken });
  } catch (error: any) {
    console.error("Error registering device token:", error);
    
    // Return more informative error response
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error.message || "An unexpected error occurred",
        field: "server"
      },
      { status: 500 }
    );
  }
}

async function GET(request: NextRequest) {
  try {
    const data = await prisma.tokenUserDevice.findMany({
      where: {
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data });


  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
