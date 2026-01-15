import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import { sendNotificationMobileToManyUser } from "@/lib/mobile/notification/send-notification";
import { routeAdminMobile } from "@/lib/mobile/route-page-mobile";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  NotificationMobileBodyType,
  NotificationMobileTitleType,
} from "../../../../../types/type-mobile-notification";

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

    //   const msg = `HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPAADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya.\n\n\n> Kode OTP anda: ${codeOtp}.`;
    const msg = `HIPMI%20-%20Kode%20ini%20bersifat%20RAHASIA%20dan%20JANGAN%20DI%20BAGIKAN%20KEPADA%20SIAPAPUN%2C%20termasuk%20anggota%20ataupun%20pengurus%20HIPMI%20lainnya.%20Kode%20OTP%20anda%3A%20${codeOtp}.`;
    // // const encodedMsg = encodeURIComponent(msg);

    const res = await fetch(
      `https://wa.wibudev.com/code?nom=${data.nomor}&text=${msg}`,
      { cache: "no-cache" }
    );

    const sendWa = await res.json();

    if (sendWa.status !== "success")
      return NextResponse.json(
        { success: false, message: "Nomor Whatsapp Tidak Aktif" },
        { status: 400 }
      );

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
