import { describe, expect, test } from 'bun:test'
import { withRetry, withTimeout } from '@/lib/prisma-retry'

// Konfigurasi retry cepat agar test tidak lambat (delay kecil).
const FAST = { initialDelay: 1, maxDelay: 5, factor: 2, maxRetries: 3 }

describe('withRetry', () => {
  test('mengembalikan hasil operasi yang sukses tanpa retry', async () => {
    let calls = 0
    const result = await withRetry(async () => {
      calls++
      return 'ok'
    }, FAST)
    expect(result).toBe('ok')
    expect(calls).toBe(1)
  })

  test('retry pada error retryable lalu sukses', async () => {
    let calls = 0
    const result = await withRetry(async () => {
      calls++
      if (calls < 2) throw new Error('ECONNRESET: connection reset')
      return 'recovered'
    }, FAST)
    expect(result).toBe('recovered')
    expect(calls).toBe(2)
  })

  test('tidak retry pada error non-retryable (langsung throw)', async () => {
    let calls = 0
    await expect(
      withRetry(async () => {
        calls++
        throw new Error('validation failed: bad input')
      }, FAST),
    ).rejects.toThrow('validation failed')
    expect(calls).toBe(1) // tidak ada retry untuk error non-transient
  })

  test('melempar error terakhir setelah maxRetries habis', async () => {
    let calls = 0
    await expect(
      withRetry(async () => {
        calls++
        throw new Error('ETIMEDOUT: connection timeout')
      }, FAST),
    ).rejects.toThrow('ETIMEDOUT')
    expect(calls).toBe(FAST.maxRetries)
  })
})

describe('withTimeout', () => {
  test('mengembalikan hasil jika operasi selesai sebelum timeout', async () => {
    const result = await withTimeout(async () => 'cepat', 1000)
    expect(result).toBe('cepat')
  })

  test('melempar error timeout jika operasi terlalu lama', async () => {
    await expect(
      withTimeout(() => new Promise((r) => setTimeout(() => r('lambat'), 50)), 5),
    ).rejects.toThrow('timed out')
  })
})
