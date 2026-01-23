import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../types/type-mobile-notification";
import { sendCodeOtp } from "@/lib/code-otp-sender";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const { data } = await req.json();
  console.log("data >>", data);
  const codeOtp = randomOTP();
  try {
    const cekUsername = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (cekUsername)
      return NextResponse.json({
        success: false,
        message: "Username sudah digunakan",
      });

    // ✅ Validasi wajib setuju Terms
    if (data.termsOfServiceAccepted !== true) {
      return NextResponse.json({
        success: false,
        message: "You must agree to the Terms of Service",
      });
    }

    const createUser = await prisma.user.create({
      data: {
        username: data.username,
        nomor: data.nomor,
        active: false,
        termsOfServiceAccepted: data.termsOfServiceAccepted,
        acceptedTermsAt: new Date(),
      },
    });

    if (!createUser)
      return NextResponse.json(
        { success: false, message: "Gagal Registrasi" },
        { status: 500 }
      );

    const createOtpId = await prisma.kodeOtp.create({
      data: {
        nomor: data.nomor,
        otp: codeOtp,
      },
    });

    if (!createOtpId)
      return NextResponse.json(
        { success: false, message: "Gagal mengirim kode OTP" },
        { status: 400 }
      );

   const resSendCode = await sendCodeOtp({
      nomor: data.nomor,
      codeOtp: codeOtp.toString(),
    });

    if (resSendCode.status !== 200)
      return NextResponse.json(
        { success: false, message: "Nomor Whatsapp Tidak Aktif" },
        { status: 400 },
      );

    const sendWa = await resSendCode.text();
    console.log("WA Response:", sendWa);


    // =========== START SEND NOTIFICATION =========== //

    const adminUsers = await prisma.user.findMany({
      where: { masterUserRoleId: "2", NOT: { id: data.authorId } },
      select: { id: true },
    });

    console.log("Users to notify:", adminUsers);

    const dataNotification = {
      title: "Pendaftaran Baru",
      type: "announcement",
      kategoriApp: "OTHER",
      createdAt: new Date(),
      pesan: "User baru telah melakukan registrasi. Ayo cek dan verifikasi!",
      deepLink: `/admin/user-access/${createUser.id}`,
      senderId: createUser.id,
    };

    await sendNotificationMobileToManyUser({
      recipientIds: adminUsers.map((user) => user.id),
      senderId: data.authorId,
      payload: {
        title: "Pendaftaran User Baru" as NotificationMobileTitleType,
        body: "User baru telah melakukan registrasi. Ayo cek dan verifikasi!" as NotificationMobileBodyType,
        type: "announcement",
        deepLink: routeAdminMobile.userAccess({ id: createUser.id }),
        kategoriApp: "OTHER",
      },
    });

    // =========== END SEND NOTIFICATION =========== //

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi Berhasil",
        kodeId: createOtpId.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Maaf, Terjadi Keselahan",
        reason: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
