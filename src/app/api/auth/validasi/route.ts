import { NextResponse } from "next/server";

/**
 * DINONAKTIFKAN — celah keamanan (login tanpa verifikasi OTP).
 *
 * Endpoint lama ini menerbitkan sesi hanya dari { nomor } tanpa memverifikasi
 * OTP, sehingga siapa pun yang tahu nomor korban bisa membajak akun. Login kini
 * dialihkan sepenuhnya ke Google Auth (GET /api/auth/google). File sengaja
 * dipertahankan untuk jejak; handler menolak semua request dengan 410 Gone.
 *
 * Lihat: docs/audit (temuan #1) & alur Google di /api/auth/google.
 */
const DISABLED_MESSAGE =
  "Endpoint login OTP telah dinonaktifkan. Gunakan login Google.";

export async function POST() {
  return NextResponse.json(
    { success: false, message: DISABLED_MESSAGE },
    { status: 410 }
  );
}
