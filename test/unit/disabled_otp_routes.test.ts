import { describe, expect, test } from 'bun:test'
import { POST as validasiPost } from '@/app/api/auth/validasi/route'
import { POST as mobileValidasiPost } from '@/app/api/mobile/auth/validasi/route'
import { GET as checkGet } from '@/app/api/auth/check/[id]/route'

// Regression: route login-tanpa-OTP & OTP-disclosure harus tetap MATI (410).
// Jika suatu saat handler dihidupkan lagi tanpa verifikasi, test ini gagal.

describe('route OTP yang dinonaktifkan (410 Gone)', () => {
  test('POST /api/auth/validasi menolak dengan 410', async () => {
    const res = await validasiPost()
    expect(res.status).toBe(410)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  test('POST /api/mobile/auth/validasi menolak dengan 410', async () => {
    const res = await mobileValidasiPost()
    expect(res.status).toBe(410)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  test('GET /api/auth/check/[id] menolak dengan 410 (tidak bocorkan OTP)', async () => {
    const res = await checkGet()
    expect(res.status).toBe(410)
    const body = await res.json()
    expect(body.success).toBe(false)
    // Pastikan tidak ada field kode OTP yang bocor
    expect(body.otp).toBeUndefined()
  })
})
