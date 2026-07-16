// Pure version helpers untuk pipeline deploy — tanpa I/O agar mudah di-test.

export type BumpType = 'patch' | 'minor' | 'major'

/**
 * Ambil string versi dari response GET /api/version.
 * Kontrak STG: { success, message, data: "1.7.5" } — versi ada di field `data`.
 */
export function parseVersionData(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) return null
  const data = (body as { data?: unknown }).data
  return typeof data === 'string' && data.length > 0 ? data : null
}

/** Naikkan versi semver (X.Y.Z) sesuai tipe bump. Reset komponen di bawahnya. */
export function bumpVersionString(current: string, type: BumpType): string {
  const parts = current.split('.').map(Number)
  if (parts.length !== 3 || parts.some((n) => !Number.isInteger(n) || n < 0)) {
    throw new Error(`Versi tidak valid: "${current}" (harus format X.Y.Z)`)
  }
  if (type === 'major') {
    parts[0]++
    parts[1] = 0
    parts[2] = 0
  } else if (type === 'minor') {
    parts[1]++
    parts[2] = 0
  } else {
    parts[2]++
  }
  return parts.join('.')
}
