import { NextResponse } from "next/server";

/**
 * DINONAKTIFKAN — celah keamanan (login tanpa verifikasi OTP).
 *
 * Varian mobile dari /api/auth/validasi: menerbitkan sesi hanya dari { nomor }
 * tanpa cek OTP. Login mobile kini lewat Google Auth. File dipertahankan untuk
 * jejak; handler menolak semua request dengan 410 Gone.
 *
 * Catatan: verifikasi OTP yang BENAR ada di /api/auth/mobile-validasi (tetap
 * aktif untuk kompatibilitas app lama), bukan di sini.
 */
const DISABLED_MESSAGE =
  "Endpoint login OTP telah dinonaktifkan. Gunakan login Google.";

export async function POST() {
  return NextResponse.json(
    { success: false, message: DISABLED_MESSAGE },
    { status: 410 }
  );
}
