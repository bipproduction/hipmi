import { prisma } from "@/lib";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { NotificationProp } from "../route";
import { adminMessaging } from "@/lib/firebase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let fixData;
  const fixCategory = _.upperCase(category || "");

  try {
    const data = await prisma.notifikasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        recipientId: id,
        kategoriApp: fixCategory,
      },
    });

    fixData = data;

    return NextResponse.json({
      success: true,
      data: fixData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.notifikasi.update({
      where: {
        id: id,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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

  try {
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

    const created = await prisma.notifikasi.create({
      data: {
        title,
        type,
        createdAt: new Date(),
        appId,
        kategoriApp,
        pesan: notificationBody || "",
        userRoleId: findUserLogin.masterUserRoleId,
        status,
        deepLink,
        senderId: findUserLogin.id,
        recipientId: id,
      },
    });

    if (created) {
      const deviceToken = await prisma.tokenUserDevice.findMany({
        where: {
          userId: id,
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
            id: created.id,
            deepLink: deepLink || "",
          },
          // Konfigurasi Android untuk prioritas tinggi
          android: {
            priority: "high" as const, // Kirim secepatnya, bahkan di doze mode untuk notifikasi penting
            notification: {
              channelId: "default", // Sesuaikan dengan channel yang kamu buat di Android
            },

            ttl: 0 as const, // Kirim secepatnya, jangan tunda
          },
          // Opsional: tambahkan untuk iOS juga
          apns: {
            payload: {
              aps: {
                sound: "default" as const,
                // 'content-available': 1 as const, // jika butuh silent push
              },
            },
          },
        };

        try {
          const response = await adminMessaging.send(message);
          console.log("✅ FCM sent successfully", "Response:", response);
        } catch (error: any) {
          console.error("❌ FCM send failed:", error);
          // Lanjutkan ke token berikutnya meski satu gagal
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.error("❌ FCM error:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
