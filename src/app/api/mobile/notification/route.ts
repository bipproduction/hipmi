// app/api/test/notifications/route.ts
import { prisma } from "@/lib";
import { adminMessaging } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

type NotificationProp = {
  title: string;
  body: string;
  userLoginId: string;
  appId?: string;
  status?: string;
  kategoriApp?: string;
  type?: string;
  deepLink?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    const {
      title,
      body: notificationBody,
      userLoginId,
      type,
      kategoriApp,
      appId,
      status,
      deepLink,
    } = data as NotificationProp;

    console.log("Notification Send >>", data);

    // Cari user yang login
    const findUserLogin = await prisma.user.findUnique({
      where: {
        id: userLoginId,
      },
    });

    if (!findUserLogin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Cari token fcm user yang login
    const checkFcmToken = await prisma.tokenUserDevice.findFirst({
      where: {
        userId: findUserLogin.id,
      },
    });

    if (!checkFcmToken) {
      return NextResponse.json(
        { error: "FCM Token not found" },
        { status: 404 }
      );
    }

    // Jika user yang masuk maka notifikasik akan dikirim ke semua admin , begitu sebaliknya !
    const filterByCurrentLoginId =
      findUserLogin.masterUserRoleId === "1" ? "2" : "1";

    // Cari user yang akan menerima notifikasi
    const findAllUserBySendTo = await prisma.user.findMany({
      where: {
        masterUserRoleId: filterByCurrentLoginId,
        NOT: {
          id: findUserLogin.id,
        },
      },
    });

    console.log("Find All User By Send To >>", findAllUserBySendTo);

    for (let a of findAllUserBySendTo) {
      const responseCreatedNotifications = await createNotification({
        title,
        type: type as string,
        createdAt: new Date(),
        pesan: notificationBody || "",
        appId: appId as string,
        kategoriApp: kategoriApp as string,
        userRoleId: findUserLogin.masterUserRoleId,
        status: status,
        deepLink: deepLink,
        senderId: findUserLogin.id,
        recipientId: a.id,
      });

      if (responseCreatedNotifications) {
        const deviceToken = await prisma.tokenUserDevice.findMany({
          where: {
            userId: a.id,
            isActive: true,
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
              id: responseCreatedNotifications.id,
              deepLink: deepLink || "",
              // contoh: senderId, type, etc.
            },
          };

          const response = await adminMessaging.send(message);
          console.log("✅ FCM sent:", response);
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to create notification",
        });
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

async function createNotification({
  title,
  type,
  createdAt,
  appId,
  kategoriApp,
  pesan,
  userRoleId,
  status,
  deepLink,
  senderId,
  recipientId,
}: {
  title: string;
  type: string;
  createdAt: Date;
  appId: string;
  kategoriApp: string;
  userRoleId: string;
  status?: string;
  deepLink?: string;
  pesan: string;

  senderId: string;
  recipientId: string;
}) {
  const createNotification = await prisma.notifikasi.create({
    data: {
      title,
      type,
      createdAt,
      appId,
      kategoriApp,
      pesan,
      userRoleId,
      status,
      deepLink,
      senderId,
      recipientId,
    },
  });

  return createNotification;
}
