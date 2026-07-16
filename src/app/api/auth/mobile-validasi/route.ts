import { sessionCreate } from "@/app/(auth)/_lib/session_create";
import prisma from "@/lib/prisma";
import { isAppleReviewBypass } from "@/app_modules/auth/_lib/apple_review_bypass";
import { NextResponse } from "next/server";

/**
 * Validasi OTP untuk login mobile
 * @param req - Request dengan body { nomor: string, code: string }
 * @returns Response dengan token jika OTP valid
 */
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const { nomor, code } = await req.json();

    // Validasi input: nomor dan code wajib ada
    if (!nomor || !code) {
      return NextResponse.json(
        { success: false, message: "Nomor dan kode OTP wajib diisi" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // BACKDOOR APPLE REVIEW — WAJIB DIBACA sebelum mengubah.
    // Melewati verifikasi OTP agar reviewer App Store bisa login tanpa menerima
    // OTP. HANYA aktif jika env `ALLOW_APPLE_REVIEW_BYPASS=true` (default MATI).
    // Logika & kredensial ada di @/app_modules/auth/_lib/apple_review_bypass.
    // SOP lengkap: APPLE_REVIEW_BYPASS.md (root project).
    // ─────────────────────────────────────────────────────────────────────────
    const useReviewBypass = isAppleReviewBypass({
      nomor,
      code,
      enabled: process.env.ALLOW_APPLE_REVIEW_BYPASS === "true",
    });

    // Cek user berdasarkan nomor
    const dataUser = await prisma.user.findUnique({
      where: {
        nomor: nomor,
      },
      select: {
        id: true,
        nomor: true,
        username: true,
        active: true,
        masterUserRoleId: true,
        termsOfServiceAccepted: true,
      },
    });

    if (dataUser == null) {
      return NextResponse.json(
        { success: false, message: "Nomor Belum Terdaftar" },
        { status: 200 }
      );
    }

    // Validasi OTP (skip untuk Apple Review number di production)
    let otpValid = false;

    if (useReviewBypass) {
      // Bypass hanya jalan bila ALLOW_APPLE_REVIEW_BYPASS=true (lihat komentar di atas).
      otpValid = true;
      console.warn(
        "[APPLE_REVIEW_BYPASS] OTP dilewati untuk nomor review — pastikan flag ini mati di produksi."
      );
    } else {
      // Normal flow: validasi OTP dari database
      const otpRecord = await prisma.kodeOtp.findFirst({
        where: {
          nomor: nomor,
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!otpRecord) {
        return NextResponse.json(
          { success: false, message: "Kode OTP tidak ditemukan" },
          { status: 400 }
        );
      }

      // Cek expired OTP (5 menit dari createdAt)
      const now = new Date();
      const otpCreatedAt = new Date(otpRecord.createdAt);
      const expiredTime = new Date(otpCreatedAt.getTime() + 5 * 60 * 1000); // 5 menit

      if (now > expiredTime) {
        // OTP sudah expired, update isActive menjadi false
        await prisma.kodeOtp.updateMany({
          where: {
            nomor: nomor,
            isActive: true,
          },
          data: {
            isActive: false,
          },
        });

        return NextResponse.json(
          { success: false, message: "Kode OTP sudah kadaluarsa" },
          { status: 400 }
        );
      }

      // Validasi code OTP
      const inputCode = parseInt(code);
      if (isNaN(inputCode) || inputCode !== otpRecord.otp) {
        return NextResponse.json(
          { success: false, message: "Kode OTP tidak valid" },
          { status: 400 }
        );
      }

      otpValid = true;

      // Nonaktifkan OTP yang sudah digunakan
      await prisma.kodeOtp.updateMany({
        where: {
          nomor: nomor,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });
    }

    // Generate token jika OTP valid
    if (!otpValid) {
      return NextResponse.json(
        { success: false, message: "Validasi OTP gagal" },
        { status: 400 }
      );
    }

    const token = await sessionCreate({
      sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
      user: dataUser as any,
    });

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Gagal membuat session" },
        { status: 500 }
      );
    }

    // Buat response dengan token dalam cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Berhasil Login",
        roleId: dataUser.masterUserRoleId,
        active: dataUser.active,
        termsOfServiceAccepted: dataUser.termsOfServiceAccepted,
        token: token,
      },
      { status: 200 }
    );

    // Set cookie dengan token yang sudah dipastikan tidak null
    response.cookies.set(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!, token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 hari dalam detik (1 bulan)
    });

    return response;
  } catch (error) {
    console.log("API Error or Server Error", error);
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
