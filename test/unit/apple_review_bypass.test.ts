import { describe, expect, test } from 'bun:test'
import {
  isAppleReviewBypass,
  APPLE_REVIEW_NOMOR,
  APPLE_REVIEW_CODE,
} from '@/app_modules/auth/_lib/apple_review_bypass'

describe('isAppleReviewBypass (guard backdoor login)', () => {
  test('AKTIF hanya bila enabled + nomor + kode cocok', () => {
    expect(
      isAppleReviewBypass({ nomor: APPLE_REVIEW_NOMOR, code: APPLE_REVIEW_CODE, enabled: true }),
    ).toBe(true)
  })

  // Regression keamanan terpenting: tanpa flag, backdoor HARUS mati
  // walau nomor + kode benar.
  test('MATI bila enabled=false meski nomor & kode cocok', () => {
    expect(
      isAppleReviewBypass({ nomor: APPLE_REVIEW_NOMOR, code: APPLE_REVIEW_CODE, enabled: false }),
    ).toBe(false)
  })

  test('MATI bila nomor tidak cocok (walau enabled)', () => {
    expect(
      isAppleReviewBypass({ nomor: '628999999999', code: APPLE_REVIEW_CODE, enabled: true }),
    ).toBe(false)
  })

  test('MATI bila kode tidak cocok (walau enabled)', () => {
    expect(
      isAppleReviewBypass({ nomor: APPLE_REVIEW_NOMOR, code: '9999', enabled: true }),
    ).toBe(false)
  })

  test('MATI untuk user biasa acak', () => {
    expect(
      isAppleReviewBypass({ nomor: '628111222333', code: '5678', enabled: true }),
    ).toBe(false)
    expect(
      isAppleReviewBypass({ nomor: '628111222333', code: '5678', enabled: false }),
    ).toBe(false)
  })
})
