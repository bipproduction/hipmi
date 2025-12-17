// app/api/test/notifications/route.ts
import { adminMessaging } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();
    const { fcmToken, title, body: notificationBody } = data;

    console.log("Data Notifikasi >>", data);

    if (!fcmToken || !title) {
      return NextResponse.json(
        { error: "Missing fcmToken or title" },
        { status: 400 }
      );
    }

    const message = {
      token: fcmToken,
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

    const response = await adminMessaging.send(message);
    console.log("✅ FCM sent:", response);

    return NextResponse.json({ success: true, messageId: response });
  } catch (error: any) {
    console.error("❌ FCM error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send FCM" },
      { status: 500 }
    );
  }
}
