import { prisma } from "@/lib";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import { NextResponse } from "next/server";
import { funSendToWhatsApp } from "@/lib/code-otp-sender";

export async function POST(req: Request) {
  try {
    const codeOtp = randomOTP();
    const body = await req.json();
    const { nomor } = body;

    const user = await prisma.user.findUnique({
      where: {
        nomor: nomor,
      },
    });

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
        { status: 400 },
      );

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

    return NextResponse.json(
      {
        success: true,
        message: "Kode verifikasi terkirim",
        kodeId: createOtpId.id,
        isAcceptTerms: user.termsOfServiceAccepted,
      },
      { status: 200 },
    );
  } catch (error) {
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
