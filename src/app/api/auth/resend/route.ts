import { prisma } from "@/lib";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const codeOtp = randomOTP();
    const body = await req.json();
    const { nomor } = body;

    const msg = `HIPMI%20-%20Kode%20ini%20bersifat%20RAHASIA%20dan%20JANGAN%20DI%20BAGIKAN%20KEPADA%20SIAPAPUN%2C%20termasuk%20anggota%20ataupun%20pengurus%20HIPMI%20lainnya.%5Cn%5Cn%3E%3E%20Kode%20OTP%20anda%3A%20${codeOtp}.`;

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

    const createOtpId = await prisma.kodeOtp.create({
      data: {
        nomor: nomor,
        otp: codeOtp,
      },
    });

    if (!createOtpId)
      return NextResponse.json(
        {
          success: false,
          message: "Gagal Membuat Kode OTP",
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Kode Verifikasi Dikirim",
        kodeId: createOtpId.id,
      },
      { status: 200 }
    );
  } catch (error) {
    backendLogger.error(" Error Resend OTP", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Whatsapp Error !!",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
