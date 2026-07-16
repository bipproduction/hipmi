import { describe, expect, test } from 'bun:test'
import { randomOTP } from '@/app_modules/auth/fun/rondom_otp'

describe('randomOTP (generator kode OTP)', () => {
  test('selalu integer', () => {
    for (let i = 0; i < 1000; i++) {
      const otp = randomOTP()
      expect(Number.isInteger(otp)).toBe(true)
    }
  })

  // Mendokumentasikan BUG range (lihat audit): rumus
  // Math.floor(random * (9000 - 1000)) + 1000 menghasilkan 1000..8999,
  // JADI TIDAK PERNAH mencapai 9000..9999. Bukan 4-digit penuh.
  test('menghasilkan nilai pada rentang aktual 1000..8999', () => {
    for (let i = 0; i < 5000; i++) {
      const otp = randomOTP()
      expect(otp).toBeGreaterThanOrEqual(1000)
      expect(otp).toBeLessThanOrEqual(8999)
    }
  })

  test('deterministik saat Math.random di-stub', () => {
    const orig = Math.random
    try {
      Math.random = () => 0 // batas bawah
      expect(randomOTP()).toBe(1000)
      Math.random = () => 0.9999999 // mendekati batas atas
      expect(randomOTP()).toBe(8999)
    } finally {
      Math.random = orig
    }
  })
})
