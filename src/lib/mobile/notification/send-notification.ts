// lib/notifications/send-notification.ts
import { adminMessaging } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";
import { NotificationMobilePayload } from "../../../../types/type-mobile-notification";

/**
 * Kirim notifikasi ke satu user (semua device aktifnya)
 * @param recipientId - ID penerima
 * @param senderId - ID pengirim
 * @param payload - Data notifikasi
 */

export async function sendNotificationMobileToOneUser({
  recipientId,
  senderId,
  payload,
}: {
  recipientId: string;
  senderId: string;
  payload: NotificationMobilePayload;
}) {
  try {
    // 1. Simpan notifikasi ke DB
    const notification = await prisma.notifikasi.create({
      data: {
        title: payload.title,
        pesan: payload.body,
        deepLink: payload.deepLink,
        kategoriApp: payload.kategoriApp,
        recipientId: recipientId,
        senderId: senderId,
      },
    });

    // 2. Ambil semua token aktif milik penerima
    const tokens = await prisma.tokenUserDevice.findMany({
      where: { userId: recipientId, isActive: true },
      select: { token: true, id: true },
    });

    if (tokens.length === 0) {
      console.warn(`No active tokens found for user ${recipientId}`);
      return;
    }

    // 3. Kirim FCM ke semua token

    await Promise.allSettled(
      tokens.map(async ({ token, id }) => {
        try {
          await adminMessaging.send({
            token,
            notification: {
              title: payload.title,
              body: payload.body,
            },
            data: {
              sentAt: new Date().toISOString(), // ✅ Simpan metadata di data
              id: notification.id,
              deepLink: payload.deepLink,
            },
            android: {
              priority: "high" as const,
              notification: { channelId: "default" },
              ttl: 0 as const,
            },
            apns: {
              payload: { aps: { sound: "default" as const } },
            },
          });
        } catch (fcmError: any) {
          // Hapus token jika invalid
          console.log("fcmError", fcmError);
          if (fcmError.code === "messaging/invalid-registration-token") {
            await prisma.tokenUserDevice.delete({ where: { id: id } });
            console.log(`❌ Invalid token removed: ${token}`);
          }
          console.error(`FCM failed for token ${token}:`, fcmError.message);
        }
      })
    );

    console.log(`✅ Notification sent to user ${recipientId}`);
  } catch (error) {
    console.error("Failed to send notification:", error);
    throw error; // biarkan caller handle error
  }
}

/**
 * Kirim notifikasi ke banyak user
 */
export async function sendNotificationMobileToManyUser({
  recipientIds,
  senderId,
  payload,
}: {
  recipientIds: string[];
  senderId: string;
  payload: NotificationMobilePayload;
}) {
  await Promise.allSettled(
    recipientIds.map((id) =>
      sendNotificationMobileToOneUser({
        recipientId: id,
        senderId: senderId,
        payload: payload,
      })
    )
  );
}
