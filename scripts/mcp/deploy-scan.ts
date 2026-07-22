// ─── Pure credential / sensitive-file scanning ───────────────────────────────
//
// Logika scan murni (tanpa git) supaya deterministik & bisa di-unit-test.
// deploy-helpers.ts mengambil diff via git lalu mendelegasikan ke sini.

export type ScanIssue = { type: string; sample: string; count: number }

export const CREDENTIAL_PATTERNS: { name: string; regex: RegExp }[] = [
  { name: 'anthropic_key', regex: /sk-ant-[a-zA-Z0-9\-_]{20,}/ },
  { name: 'openai_key', regex: /sk-[a-zA-Z0-9]{48}/ },
  { name: 'stripe_key', regex: /sk_(live|test)_[a-zA-Z0-9]{24,}/ },
  { name: 'github_pat', regex: /ghp_[a-zA-Z0-9]{36,}/ },
  { name: 'github_oauth', regex: /gho_[a-zA-Z0-9]{36,}/ },
  { name: 'github_fine_grained', regex: /github_pat_[a-zA-Z0-9_]{22,}/ },
  { name: 'slack_token', regex: /xox[baprs]-[a-zA-Z0-9\-]{20,}/ },
  { name: 'google_api_key', regex: /AIza[a-zA-Z0-9\-_]{35}/ },
  { name: 'google_oauth_token', regex: /ya29\.[a-zA-Z0-9\-_]{20,}/ },
  { name: 'private_key_pem', regex: /-----BEGIN [A-Z ]+ PRIVATE KEY-----/ },
  { name: 'db_url_with_creds', regex: /(postgres|mysql|mongodb|redis):\/\/[^:]+:[^@]+@/ },
  { name: 'hardcoded_secret', regex: /(password|secret|token)\s*[:=]\s*["'][^"']{8,}["']/ },
]

export const SENSITIVE_FILE_PATTERNS = [
  /^\.env(\.|$)/,
  /\.(pem|key|p12|pfx)$/,
  /credentials\.json$/,
  /service-account\.json$/,
  /^id_rsa$/,
  /^id_ed25519$/,
]

// Pola generik yang rawan false-positive di test fixture (mis. string JWT dummy
// pada assertion decrypt). HANYA pola ini yang dikecualikan untuk file test —
// pola high-confidence (kunci API asli, PEM, db-url, dll) tetap dipindai di mana pun.
const GENERIC_PATTERN_NAMES = ['hardcoded_secret']

// Suffix template env yang memang wajib di-commit — bukan secret asli.
const TEMPLATE_SUFFIXES = ['.example', '.sample', '.template']

function isTestFile(path: string): boolean {
  return /(^|\/)(test|tests|__tests__)\//.test(path) || /\.(test|spec)\.[tj]sx?$/.test(path)
}

/**
 * Parse teks `git diff` per file, kumpulkan baris yang ditambahkan (`+`).
 * File dilacak lewat header `+++ b/<path>`. Mengembalikan map path → gabungan
 * baris tambahan, supaya aturan skip bisa diterapkan per file.
 */
function collectAddedLinesByFile(diffText: string): Record<string, string> {
  const byFile: Record<string, string[]> = {}
  let current = ''
  for (const line of diffText.split('\n')) {
    if (line.startsWith('+++ ')) {
      const target = line.slice(4).trim()
      current = target === '/dev/null' ? '' : target.replace(/^b\//, '')
      continue
    }
    if (line.startsWith('+') && !line.startsWith('+++') && current) {
      ;(byFile[current] ??= []).push(line.slice(1))
    }
  }
  const merged: Record<string, string> = {}
  for (const file of Object.keys(byFile)) merged[file] = byFile[file].join('\n')
  return merged
}

/**
 * Pindai teks diff untuk kredensial. Pola generik (`hardcoded_secret`) dilewati
 * untuk file test; pola high-confidence tetap aktif di semua file. Bentuk hasil
 * `{ type, sample, count }` identik dengan implementasi lama.
 */
export function scanDiffForCredentials(diffText: string): ScanIssue[] {
  const byFile = collectAddedLinesByFile(diffText)
  const agg: Record<string, { sample: string; count: number }> = {}
  const order: string[] = []
  for (const file of Object.keys(byFile)) {
    const content = byFile[file]
    const skipGeneric = isTestFile(file)
    for (const { name, regex } of CREDENTIAL_PATTERNS) {
      if (skipGeneric && GENERIC_PATTERN_NAMES.indexOf(name) !== -1) continue
      const matches = content.match(new RegExp(regex.source, 'g')) ?? []
      if (matches.length === 0) continue
      if (agg[name]) {
        agg[name].count += matches.length
      } else {
        agg[name] = { sample: (matches[0] ?? '').slice(0, 20) + '***', count: matches.length }
        order.push(name)
      }
    }
  }
  return order.map((type) => ({ type, sample: agg[type].sample, count: agg[type].count }))
}

/**
 * Apakah path adalah file sensitif yang tak boleh masuk diff. Template env
 * (`.env.example`, `.env.sample`, dll) dikecualikan karena memang wajib di-commit.
 */
export function isSensitiveFile(path: string): boolean {
  const base = path.split('/').pop() ?? path
  if (TEMPLATE_SUFFIXES.some((s) => base.endsWith(s))) return false
  return SENSITIVE_FILE_PATTERNS.some((p) => p.test(base))
}
