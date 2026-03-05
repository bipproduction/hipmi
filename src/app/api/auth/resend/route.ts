import { prisma } from "@/lib";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import { funSendToWhatsApp } from "@/lib/code-otp-sender";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 },
    );
  }

  try {
    const codeOtp = randomOTP();
    const body = await req.json();
    const { nomor } = body;

    const resSendCode = await funSendToWhatsApp({
      nomor,
      codeOtp: codeOtp.toString(),
    });

    if (resSendCode.status !== 200)
      return NextResponse.json(
        { success: false, message: "Nomor Whatsapp Tidak Aktif" },
        { status: 400 },
      );

    const sendWa = await resSendCode.text();
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
        { status: 400 },
      );

    return NextResponse.json(
      {
        success: true,
        message: "Kode Verifikasi Dikirim",
        kodeId: createOtpId.id,
      },
      { status: 200 },
    );
  } catch (error) {
    backendLogger.error(" Error Resend OTP", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Whatsapp Error !!",
      },
      { status: 500 },
    );
  }
}
