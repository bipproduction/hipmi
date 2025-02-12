"use server";

import prisma from "@/lib/prisma";
import { randomOTP } from "./rondom_otp";

export async function auth_funLogin({ nomor }: { nomor: string }) {
  const codeOtp = randomOTP();
  // console.log(nomor)

  try {
    const res = await fetch(
      `https://wa.wibudev.com/code?nom=${nomor}&text=HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya. 
      \n 
      >> Kode OTP anda: ${codeOtp}.
      `
    );

    const sendWa = await res.json();
    if (sendWa.status !== "success")
      return { status: 400, message: "WA Tidak Terdaftar", kodeId: {} };

    const createOtpId = await prisma.kodeOtp.create({
      data: {
        nomor: nomor,
        otp: codeOtp,
      },
    });

    if (!createOtpId)
      return { status: 400, message: "Gagal Membuat Kode OTP", kodeId: {} };

    return {
      status: 200,
      message: "Kode Verifikasi Dikirim",
      kodeId: createOtpId.id,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error !!!", kodeId: {} };
  }
}
