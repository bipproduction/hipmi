import { describe, expect, test } from 'bun:test'
import { bumpVersionString, parseVersionData } from './version'

describe('parseVersionData', () => {
  test('mengambil versi dari field data (kontrak STG /api/version)', () => {
    const body = { success: true, message: 'Success get version', data: '1.7.5' }
    expect(parseVersionData(body)).toBe('1.7.5')
  })

  // Regression: sebelumnya kode baca json.version (selalu null/false) — bug fix.
  test('mengembalikan null jika hanya ada field version, bukan data', () => {
    expect(parseVersionData({ version: '1.7.5' })).toBeNull()
  })

  test('mengembalikan null untuk data kosong', () => {
    expect(parseVersionData({ data: '' })).toBeNull()
  })

  test('mengembalikan null untuk data non-string', () => {
    expect(parseVersionData({ data: 123 })).toBeNull()
  })

  test('mengembalikan null untuk input non-objek', () => {
    expect(parseVersionData(null)).toBeNull()
    expect(parseVersionData('1.7.5')).toBeNull()
    expect(parseVersionData(undefined)).toBeNull()
  })
})

describe('bumpVersionString', () => {
  test('patch menaikkan komponen ketiga', () => {
    expect(bumpVersionString('1.7.5', 'patch')).toBe('1.7.6')
  })

  test('minor menaikkan komponen kedua dan reset patch', () => {
    expect(bumpVersionString('1.7.5', 'minor')).toBe('1.8.0')
  })

  test('major menaikkan komponen pertama dan reset sisanya', () => {
    expect(bumpVersionString('1.7.5', 'major')).toBe('2.0.0')
  })

  test('melempar error untuk format versi tidak valid', () => {
    expect(() => bumpVersionString('1.7', 'patch')).toThrow()
    expect(() => bumpVersionString('abc', 'minor')).toThrow()
    expect(() => bumpVersionString('1.7.x', 'patch')).toThrow()
  })
})
