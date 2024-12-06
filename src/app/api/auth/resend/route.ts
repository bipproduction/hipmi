import { prisma } from "@/app/lib";
import { randomOTP } from "@/app_modules/auth/fun/rondom_otp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const codeOtp = randomOTP();
    const body = await req.json();
    const { nomor } = body;

    try {
      const res = await fetch(
        `https://wa.wibudev.com/code?nom=${nomor}&text=HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya.
      \n
      >> Kode OTP anda: ${codeOtp}.
      `
      );

      const sendWa = await res.json();
      if (sendWa.status !== "success")
        return new Response(
          JSON.stringify({
            success: false,
            message: "Nomor Whatsapp Tidak Aktif",
          }),
          { status: 400 }
        );

      const createOtpId = await prisma.kodeOtp.create({
        data: {
          nomor: nomor,
          otp: codeOtp,
        },
      });

      if (!createOtpId)
        return new Response(
          JSON.stringify({
            success: false,
            message: "Gagal Membuat Kode OTP",
          }),
          { status: 400 }
        );

      return new Response(
        JSON.stringify({
          success: true,
          message: "Kode Verifikasi Dikirim",
          kodeId: createOtpId.id,
        }),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Server Whatsapp Error !!",
        }),
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ success: false });
}
