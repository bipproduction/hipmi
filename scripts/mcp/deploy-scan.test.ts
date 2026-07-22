import { describe, expect, test } from 'bun:test'
import { scanDiffForCredentials, isSensitiveFile } from './deploy-scan'

// Bangun potongan teks `git diff` sintetis: satu file + baris yang ditambahkan.
function makeDiff(path: string, addedLines: string[]): string {
  const header = [`diff --git a/${path} b/${path}`, `--- a/${path}`, `+++ b/${path}`, '@@ -0,0 +1 @@']
  return [...header, ...addedLines.map((l) => `+${l}`)].join('\n')
}

// Fixture secret high-confidence dibangun terprogram (concat runtime) supaya file
// test ini sendiri tidak memicu credential scanner saat masuk diff preflight —
// pola high-confidence TIDAK dikecualikan untuk file test, hanya `hardcoded_secret`.
const FAKE_GH_PAT = 'ghp_' + 'a'.repeat(40)
const FAKE_PEM = '-----BEGIN RSA PRIVATE KEY' + '-----'

describe('scanDiffForCredentials', () => {
  test('mengabaikan hardcoded_secret di file test (regresi session_jwt.test.ts)', () => {
    const diff = makeDiff('test/unit/session_jwt.test.ts', [
      "    expect(await decrypt({ token: 'bukan.jwt.valid', encodedKey: KEY })).toBeNull()",
    ])
    const issues = scanDiffForCredentials(diff)
    expect(issues.find((i) => i.type === 'hardcoded_secret')).toBeUndefined()
  })

  test('tetap mendeteksi github_pat di file test (keamanan tak melemah)', () => {
    const diff = makeDiff('test/unit/leak.test.ts', [`const t = '${FAKE_GH_PAT}'`])
    const issues = scanDiffForCredentials(diff)
    expect(issues.find((i) => i.type === 'github_pat')).toBeDefined()
  })

  test('tetap mendeteksi private key PEM di file test', () => {
    const diff = makeDiff('test/unit/leak.test.ts', [FAKE_PEM])
    const issues = scanDiffForCredentials(diff)
    expect(issues.find((i) => i.type === 'private_key_pem')).toBeDefined()
  })

  test('mendeteksi hardcoded_secret di file non-test (src)', () => {
    const diff = makeDiff('src/config/secret.ts', ["const token = 'super-secret-value'"])
    const issues = scanDiffForCredentials(diff)
    expect(issues.find((i) => i.type === 'hardcoded_secret')).toBeDefined()
  })

  test('diff kosong tidak menghasilkan issue', () => {
    expect(scanDiffForCredentials('')).toEqual([])
  })
})

describe('isSensitiveFile', () => {
  test('template env dikecualikan (wajib di-commit)', () => {
    expect(isSensitiveFile('.env.example')).toBe(false)
    expect(isSensitiveFile('.env.sample')).toBe(false)
    expect(isSensitiveFile('config/.env.template')).toBe(false)
  })

  test('file env asli & kredensial tetap ditandai', () => {
    expect(isSensitiveFile('.env')).toBe(true)
    expect(isSensitiveFile('.env.production')).toBe(true)
    expect(isSensitiveFile('server.pem')).toBe(true)
    expect(isSensitiveFile('secrets/credentials.json')).toBe(true)
    expect(isSensitiveFile('id_rsa')).toBe(true)
  })

  test('file biasa tidak ditandai', () => {
    expect(isSensitiveFile('src/index.ts')).toBe(false)
    expect(isSensitiveFile('README.md')).toBe(false)
  })
})
