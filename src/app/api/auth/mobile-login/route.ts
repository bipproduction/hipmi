import { prisma } from "@/lib";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const codeOtp = randomOTP();
    const body = await req.json();
    console.log("[Masuk API]", body);
    const { nomor } = body;

    const user = await prisma.user.findUnique({
      where: {
        nomor: nomor,
      },
    });

    console.log(["cek user", user]);
    console.log(["cek nomor", nomor]);

    if (!user)
      return NextResponse.json({
        success: false,
        message: "User tidak ditemukan",
        status: 404,
      });

    const createOtpId = await prisma.kodeOtp.create({
      data: {
        nomor: nomor,
        otp: codeOtp,
      },
    });

    if (!createOtpId)
      return NextResponse.json(
        { success: false, message: "Gagal mengirim kode OTP" },
        { status: 400 }
      );

    // const msg = `HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPAADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya.\n\n\n> Kode OTP anda: ${codeOtp}.`;
    // const encodedMsg = encodeURIComponent(msg);
    const msg = `HIPMI%20-%20Kode%20ini%20bersifat%20RAHASIA%20dan%20JANGAN%20DI%20BAGIKAN%20KEPADA%20SIAPAPUN%2C%20termasuk%20anggota%20ataupun%20pengurus%20HIPMI%20lainnya.%20Kode%20OTP%20anda%3A%20${codeOtp}.`;

    const res = await fetch(
      `https://cld-dkr-prod-wajs-server.wibudev.com/api/wa/code?nom=${nomor}&text=${msg}`,
      {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${process.env.WA_SERVER_TOKEN}`,
        },
      }
    );

    if (res.status !== 200)
      return NextResponse.json(
        { success: false, message: "Nomor Whatsapp Tidak Aktif" },
        { status: 400 }
      );

    const sendWa = await res.text();
    console.log("WA Response:", sendWa);

    return NextResponse.json(
      {
        success: true,
        message: "Kode verifikasi terkirim",
        kodeId: createOtpId.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi masalah saat login",
        reason: error as Error,
      },
      { status: 500 }
    );
  }
}
