import { prisma } from "@/lib";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import backendLogger from "@/util/backendLogger";
import { NextResponse } from "next/server";
import { sendCodeOtp } from "@/lib/code-otp-sender";

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

    const createOtpId = await prisma.kodeOtp.create({
      data: {
        nomor: nomor,
        otp: codeOtp,
      },
    });

    if (!createOtpId)
      return NextResponse.json(
        { success: false, message: "Gagal mengirim kode OTP" },
        { status: 400 },
      );

    const resSendCode = await sendCodeOtp({
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

    return NextResponse.json(
      {
        success: true,
        message: "Kode verifikasi terkirim",
        kodeId: createOtpId.id,
      },
      { status: 200 },
    );
  } catch (error) {
    backendLogger.log("Error Login", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi masalah saat login",
        reason: error as Error,
      },
      { status: 500 },
    );
  }
}
