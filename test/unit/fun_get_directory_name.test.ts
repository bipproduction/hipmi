import { describe, expect, test } from 'bun:test'
import { funGetDirectoryNameByValue } from '@/app_modules/_global/fun/get/fun_get_directory_name'
import { DIRECTORY_ID } from '@/lib'

describe('funGetDirectoryNameByValue (reverse lookup DIRECTORY_ID)', () => {
  test('mengembalikan key untuk value yang ada', async () => {
    // Ambil satu pasangan nyata dari konstanta agar test tidak rapuh
    const [firstKey, firstValue] = Object.entries(DIRECTORY_ID as Record<string, string>)[0]
    expect(await funGetDirectoryNameByValue({ value: firstValue })).toBe(firstKey)
  })

  test('mengembalikan undefined untuk value yang tidak ada', async () => {
    expect(await funGetDirectoryNameByValue({ value: '__tidak_ada__' })).toBeUndefined()
  })

  test('mengembalikan null untuk value kosong', async () => {
    expect(await funGetDirectoryNameByValue({ value: '' })).toBeNull()
  })

  test('mengembalikan null untuk value null/undefined', async () => {
    expect(await funGetDirectoryNameByValue({ value: null })).toBeNull()
    expect(await funGetDirectoryNameByValue({ value: undefined })).toBeNull()
  })
})
