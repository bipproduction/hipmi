import { describe, expect, test } from 'bun:test'
import { encrypt } from '@/app/(auth)/_lib/encrypt'
import { decrypt } from '@/app/(auth)/_lib/decrypt'

// Kunci HMAC khusus test — bukan secret produksi.
const KEY = 'test-secret-key-for-unit-tests-only-0123456789'
const OTHER_KEY = 'different-secret-key-should-not-verify-9876543210'

describe('encrypt/decrypt (JWT session HS256)', () => {
  test('round-trip: user yang di-encrypt kembali utuh saat decrypt', async () => {
    const user = { id: 'u1', username: 'budi', masterUserRoleId: '1' }
    const token = await encrypt({ user, encodedKey: KEY })
    expect(token).toBeString()

    const decoded = await decrypt({ token: token!, encodedKey: KEY })
    expect(decoded).toMatchObject(user)
  })

  test('decrypt dengan key berbeda mengembalikan null (signature tidak cocok)', async () => {
    const token = await encrypt({ user: { id: 'u1' }, encodedKey: KEY })
    const decoded = await decrypt({ token: token!, encodedKey: OTHER_KEY })
    expect(decoded).toBeNull()
  })

  test('decrypt dengan token kosong mengembalikan null', async () => {
    expect(await decrypt({ token: '', encodedKey: KEY })).toBeNull()
  })

  test('decrypt dengan encodedKey kosong mengembalikan null', async () => {
    const token = await encrypt({ user: { id: 'u1' }, encodedKey: KEY })
    expect(await decrypt({ token: token!, encodedKey: '' })).toBeNull()
  })

  test('decrypt token sampah (bukan JWT) mengembalikan null', async () => {
    expect(await decrypt({ token: 'bukan.jwt.valid', encodedKey: KEY })).toBeNull()
  })

  test('token yang sudah expired mengembalikan null', async () => {
    // exp di masa lampau -> jwtVerify menolak.
    const token = await encrypt({ user: { id: 'u1' }, exp: '-1h', encodedKey: KEY })
    expect(await decrypt({ token: token!, encodedKey: KEY })).toBeNull()
  })
})
