// app/api/test/notifications/route.ts
import { adminMessaging } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();
    const {
      fcmToken,
      title,
      body: notificationBody,
      userLoginId,
      type,
      kategoriApp,
    } = data;

    console.log("Data Notifikasi >>", data);

    if (!fcmToken || !title) {
      return NextResponse.json(
        { error: "Missing fcmToken or title" },
        { status: 400 }
      );
    }

    const findUserLogin = await prisma.user.findUnique({
      where: {
        id: userLoginId,
      },
    });

    if (!findUserLogin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const deviceToken = await prisma.tokenUserDevice.findMany({
      where: {
        isActive: true,
        NOT: {
          userId: findUserLogin.id,
        },
      },
      include: {
        user: true,
      },
    });

    for (let i of deviceToken) {
      const message = {
        token: i.token,
        notification: {
          title,
          body: notificationBody || "",
        },
        data: {
          sentAt: new Date().toISOString(), // ✅ Simpan metadata di data
          // contoh: senderId, type, etc.
        },
      };
      console.log("[MSG]", message);

      if (i.user?.masterUserRoleId === "1") {
        const createNotification = await prisma.notifikasi.create({
          data: {
            title,
            type,
            createdAt: message.data.sentAt,
            appId: "test-id-app",
            userRoleId: findUserLogin.masterUserRoleId,
            kategoriApp: "PERCOBAAN",
            pesan: notificationBody || "",
            userId: i.userId,
          },
        });

        if (createNotification) {
          const response = await adminMessaging.send(message);
          console.log("✅ FCM sent:", response);
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to create notification",
          });
        } 
      } else {
         const createNotification = await prisma.notifikasi.create({
          data: {
            title,
            type,
            createdAt: message.data.sentAt,
            appId: "test-id-app",
            userRoleId: findUserLogin.masterUserRoleId,
            kategoriApp: "PERCOBAAN",
            pesan: notificationBody || "",
            adminId: i.userId,
          },
        });

        if (createNotification) {
          const response = await adminMessaging.send(message);
          console.log("✅ FCM sent:", response);
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to create notification",
          });
        } 

      }
    }

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error: any) {
    console.error("❌ FCM error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send FCM" },
      { status: 500 }
    );
  }
}
