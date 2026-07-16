import { describe, expect, test } from 'bun:test'
import funProgressBar from '@/app_modules/investasi/fun/fun_progress_bar'

describe('funProgressBar (persentase progress investasi)', () => {
  test('menghitung persentase dan membulatkan', async () => {
    expect(await funProgressBar(100, 50)).toBe(50)
    expect(await funProgressBar(100, 25)).toBe(25)
    expect(await funProgressBar(100, 100)).toBe(100)
  })

  test('membulatkan ke integer terdekat', async () => {
    // 1/3 -> 33.33% -> 33
    expect(await funProgressBar(3, 1)).toBe(33)
    // 2/3 -> 66.66% -> 67
    expect(await funProgressBar(3, 2)).toBe(67)
  })

  test('beli 0 menghasilkan 0 persen', async () => {
    expect(await funProgressBar(100, 0)).toBe(0)
  })

  // Mendokumentasikan edge case: total 0 -> pembagian nol.
  // Saat ini fungsi TIDAK menjaga divide-by-zero (lihat audit 1.x).
  test('total 0 menghasilkan NaN (divide-by-zero belum dijaga)', async () => {
    expect(await funProgressBar(0, 0)).toBeNaN()
  })

  test('beli melebihi total menghasilkan >100 persen', async () => {
    expect(await funProgressBar(100, 150)).toBe(150)
  })
})
