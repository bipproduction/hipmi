import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

/**
 * DINONAKTIFKAN — celah keamanan (OTP disclosure).
 *
 * Endpoint lama ini mengembalikan record OTP lengkap (termasuk kode mentah)
 * untuk id apa pun tanpa autentikasi. Dipakai alur verifikasi OTP sisi frontend
 * yang kini digantikan Google Auth. File dipertahankan untuk jejak; handler
 * menolak semua request dengan 410 Gone.
 *
 * Lihat: docs/audit (temuan #2).
 */
const DISABLED_MESSAGE =
  "Endpoint verifikasi OTP telah dinonaktifkan. Gunakan login Google.";

export async function GET() {
  return NextResponse.json(
    { success: false, message: DISABLED_MESSAGE },
    { status: 410 }
  );
}
