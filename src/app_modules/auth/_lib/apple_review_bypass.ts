// Logika keputusan backdoor "Apple Review" — dipisah agar bisa di-test tanpa DB.
// Lihat APPLE_REVIEW_BYPASS.md untuk konteks & SOP.

export const APPLE_REVIEW_NOMOR = "6282340374412";
export const APPLE_REVIEW_CODE = "1234";

/**
 * Tentukan apakah request boleh melewati verifikasi OTP via backdoor review.
 *
 * Aktif HANYA jika `enabled` true (dari env ALLOW_APPLE_REVIEW_BYPASS === "true")
 * DAN nomor + kode cocok dengan kredensial review. Default: false (aman).
 */
export function isAppleReviewBypass({
  nomor,
  code,
  enabled,
}: {
  nomor: string;
  code: string;
  enabled: boolean;
}): boolean {
  if (!enabled) return false;
  return nomor === APPLE_REVIEW_NOMOR && code === APPLE_REVIEW_CODE;
}
