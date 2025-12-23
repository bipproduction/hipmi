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
  // sendTo: "user" | "admin" | "all";
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
      // sendTo,
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
      const responseCreateToAdmin = await createNotification({
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

      if (responseCreateToAdmin) {
        const deviceToken = await prisma.tokenUserDevice.findMany({
          where: {
            userId: a.id,
            isActive: true,
            // user: {
            //   masterUserRoleId: "2",
            // },
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

    // if (sendTo === "admin") {
    //   for (let a of findAllUserBySendTo) {
    //     const responseCreateToAdmin = await createNotification({
    //       title,
    //       type: type as string,
    //       createdAt: new Date(),
    //       pesan: notificationBody || "",
    //       appId: appId as string,
    //       kategoriApp: kategoriApp as string,
    //       userRoleId: findUserLogin.masterUserRoleId,
    //       status: status,
    //       deepLink: deepLink,
    //       adminId: a.id,
    //       userId: findUserLogin.id,
    //     });

    //     if (responseCreateToAdmin) {
    //       const deviceToken = await prisma.tokenUserDevice.findMany({
    //         where: {
    //           userId: a.id,
    //           isActive: true,
    //           // user: {
    //           //   masterUserRoleId: "2",
    //           // },
    //         },
    //       });

    //       for (let i of deviceToken) {
    //         const message = {
    //           token: i.token,
    //           notification: {
    //             title,
    //             body: notificationBody || "",
    //           },
    //           data: {
    //             sentAt: new Date().toISOString(), // ✅ Simpan metadata di data
    //             // contoh: senderId, type, etc.
    //           },
    //         };

    //         const response = await adminMessaging.send(message);
    //         console.log("✅ FCM sent:", response);
    //       }
    //     } else {
    //       return NextResponse.json({
    //         success: false,
    //         message: "Failed to create notification",
    //       });
    //     }
    //   }
    // } else if (sendTo === "user") {
    //   for (let a of findAllUserBySendTo) {
    //     const responseCreateToUser = await createNotification({
    //       title,
    //       type: type as string,
    //       createdAt: new Date(),
    //       pesan: notificationBody || "",
    //       appId: appId as string,
    //       kategoriApp: kategoriApp as string,
    //       userRoleId: findUserLogin.masterUserRoleId,
    //       status: status,
    //       deepLink: deepLink,
    //       adminId: findUserLogin.id,
    //       userId: a.id,
    //     });

    //     if (responseCreateToUser) {
    //       const deviceToken = await prisma.tokenUserDevice.findMany({
    //         where: {
    //           userId: a.id,
    //           isActive: true,
    //           // user: {
    //           //   masterUserRoleId: "1",
    //           // },
    //         },
    //       });

    //       for (let i of deviceToken) {
    //         const message = {
    //           token: i.token,
    //           notification: {
    //             title,
    //             body: notificationBody || "",
    //           },
    //           data: {
    //             sentAt: new Date().toISOString(), // ✅ Simpan metadata di data
    //             // contoh: senderId, type, etc.
    //           },
    //         };

    //         const response = await adminMessaging.send(message);
    //         console.log("✅ FCM sent:", response);
    //       }
    //     } else {
    //       return NextResponse.json({
    //         success: false,
    //         message: "Failed to create notification",
    //       });
    //     }
    //   }
    // } else {
    //   return NextResponse.json({
    //     success: false,
    //     message: "Invalid ' to ' value",
    //   });
    // }

    // ================== BATAS ================== //
    // const deviceToken = await prisma.tokenUserDevice.findMany({
    //   where: {
    //     isActive: true,
    //     NOT: {
    //       userId: findUserLogin.id,
    //     },
    //     user: {
    //       masterUserRoleId: "1",
    //     },
    //   },
    //   include: {
    //     user: true,
    //   },
    // });

    // console.log("Device Token >>", deviceToken);

    // for (let i of deviceToken) {
    //   const message = {
    //     token: i.token,
    //     notification: {
    //       title,
    //       body: notificationBody || "",
    //     },
    //     data: {
    //       sentAt: new Date().toISOString(), // ✅ Simpan metadata di data
    //       // contoh: senderId, type, etc.
    //     },
    //   };

    //   if (i.user?.masterUserRoleId === "1") {
    //     const responseCreate = await createNotification({
    //       title,
    //       type: type as string,
    //       createdAt: message.data.sentAt,
    //       pesan: notificationBody || "",
    //       appId: appId as string,
    //       kategoriApp: kategoriApp as string,
    //       userRoleId: findUserLogin.masterUserRoleId,
    //       userId: findUserLogin.id,
    //       status: status,
    //       deepLink: deepLink,
    //     });

    //     if (responseCreate) {
    //       const response = await adminMessaging.send(message);
    //       console.log("✅ FCM sent:", response);
    //     } else {
    //       return NextResponse.json({
    //         success: false,
    //         message: "Failed to create notification",
    //       });
    //     }
    //   } else {
    //     const responseCreate = await createNotification({
    //       title: title,
    //       type: type as string,
    //       createdAt: message.data.sentAt,
    //       pesan: notificationBody || "",
    //       appId: appId as string,
    //       kategoriApp: kategoriApp as string,
    //       userRoleId: findUserLogin.masterUserRoleId,
    //       adminId: findUserLogin.id,
    //       status: status,
    //       deepLink: deepLink,
    //     });

    //     if (responseCreate) {
    //       const response = await adminMessaging.send(message);
    //       console.log("✅ FCM sent:", response);
    //     } else {
    //       return NextResponse.json({
    //         success: false,
    //         message: "Failed to create notification",
    //       });
    //     }
    //   }
    // }

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
