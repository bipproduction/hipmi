import { readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { bumpVersionString, parseVersionData } from './version'
import { scanDiffForCredentials, isSensitiveFile } from './deploy-scan'

export const PACKAGE_JSON = 'package.json'

export type Step = {
  step: string
  status: 'ok' | 'blocked' | 'skip' | 'error'
  detail?: string
  issues?: unknown[]
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function run(
  cmd: string,
  opts?: { cwd?: string; env?: Record<string, string> },
): { ok: boolean; out: string; err: string } {
  const result = spawnSync('bash', ['-c', cmd], {
    encoding: 'utf8',
    cwd: opts?.cwd,
    env: { ...process.env, ...(opts?.env ?? {}) },
  })
  return {
    ok: result.status === 0,
    out: (result.stdout ?? '').trim(),
    err: (result.stderr ?? '').trim(),
  }
}

// ─── Credential scan ─────────────────────────────────────────────────────────

export function scanCredentials(branch: string): { ok: boolean; issues: { type: string; sample: string; count: number }[] } {
  const diff = run(`git diff origin/${branch}..HEAD -- . ":(exclude)*.lock" ":(exclude)package-lock.json"`)
  const issues = scanDiffForCredentials(diff.ok ? diff.out : '')
  return { ok: issues.length === 0, issues }
}

export function scanSensitiveFiles(branch: string): { ok: boolean; files: string[] } {
  const result = run(`git diff --name-only origin/${branch}..HEAD`)
  const files = result.ok ? result.out.split('\n').filter(Boolean) : []
  const flagged = files.filter((f) => isSensitiveFile(f))
  return { ok: flagged.length === 0, files: flagged }
}

export function checkMigrations(branch: string): { ok: boolean; warnings: string[] } {
  const warnings: string[] = []
  const schemaDiff = run(`git diff origin/${branch}..HEAD -- prisma/schema.prisma`)
  const migrationDiff = run(`git diff --name-only origin/${branch}..HEAD -- prisma/migrations/`)
  const schemaChanged = schemaDiff.ok && schemaDiff.out.length > 0
  const hasMigration = migrationDiff.ok && migrationDiff.out.trim().length > 0
  if (schemaChanged && !hasMigration) {
    warnings.push('Schema prisma berubah tapi tidak ada migrasi baru — jalankan: bun run db:migrate')
  }
  if (hasMigration) {
    const newMigs = migrationDiff.out.trim().split('\n').filter(Boolean)
    warnings.push(
      `Ada ${newMigs.length} migrasi baru yang akan diapply: ${newMigs.map((f) => f.split('/').slice(-2)[0]).join(', ')}`,
    )
  }
  const unstaged = run('git ls-files --others --exclude-standard prisma/migrations/')
  if (unstaged.ok && unstaged.out.trim()) {
    warnings.push('Ada file migrasi yang belum di-stage/commit')
  }
  return { ok: !warnings.some((w) => w.includes('tidak ada migrasi')), warnings }
}

export function runPreflight(branch: string): {
  ok: boolean
  blockedBy: string | null
  credScan: ReturnType<typeof scanCredentials>
  fileScan: ReturnType<typeof scanSensitiveFiles>
  migrationCheck: ReturnType<typeof checkMigrations>
  treeClean: boolean
} {
  const dirty = run('git status --porcelain')
  const treeClean = dirty.ok && dirty.out.trim() === ''
  const credScan = scanCredentials(branch)
  const fileScan = scanSensitiveFiles(branch)
  const migrationCheck = checkMigrations(branch)
  let blockedBy: string | null = null
  if (!treeClean) blockedBy = 'dirty_tree'
  else if (!credScan.ok) blockedBy = 'credential_leak'
  else if (!fileScan.ok) blockedBy = 'sensitive_file'
  else if (!migrationCheck.ok) blockedBy = 'migration_missing'
  return { ok: blockedBy === null, blockedBy, credScan, fileScan, migrationCheck, treeClean }
}

// ─── GitHub Actions helpers ───────────────────────────────────────────────────

export function createGhHelpers(ghToken: string, ghRepo: string, baseUrl: string, pkgJson: string) {
  function ghRun(args: string) {
    return run(args, { env: { GH_TOKEN: ghToken } })
  }

  function readVersion(): string {
    const pkg = JSON.parse(readFileSync(pkgJson, 'utf8'))
    return pkg.version as string
  }

  function bumpVersion(type: 'patch' | 'minor' | 'major'): string {
    const next = bumpVersionString(readVersion(), type)
    const pkg = JSON.parse(readFileSync(pkgJson, 'utf8'))
    pkg.version = next
    writeFileSync(pkgJson, JSON.stringify(pkg, null, 2) + '\n')
    return next
  }

  async function triggerAndGetRunId(workflow: string, fields: string[], ref: string): Promise<string | null> {
    const fieldArgs = fields.map((f) => `-f ${f}`).join(' ')
    const before = ghRun(
      `gh run list --repo ${ghRepo} --workflow ${workflow} --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null`,
    )
    const beforeId = before.out.trim()
    const trigger = ghRun(`gh workflow run ${workflow} --repo ${ghRepo} --ref ${ref} ${fieldArgs}`)
    if (!trigger.ok) return null
    for (let i = 0; i < 6; i++) {
      await sleep(5000)
      const latest = ghRun(
        `gh run list --repo ${ghRepo} --workflow ${workflow} --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null`,
      )
      if (latest.ok && latest.out.trim() && latest.out.trim() !== beforeId) {
        return latest.out.trim()
      }
    }
    return null
  }

  async function pollWorkflow(
    runId: string,
    timeoutMs = 600_000,
  ): Promise<{ status: string; conclusion: string | null }> {
    const start = Date.now()
    while (Date.now() - start < timeoutMs) {
      await sleep(10_000)
      const r = ghRun(
        `gh run view ${runId} --repo ${ghRepo} --json status,conclusion --jq '[.status,.conclusion] | join(":")'`,
      )
      if (r.ok && r.out.includes(':')) {
        const [status, conclusion] = r.out.split(':')
        if (status === 'completed') return { status, conclusion: conclusion || null }
      }
    }
    return { status: 'timeout', conclusion: null }
  }

  async function verifyVersion(expected: string, timeoutMs = 120_000): Promise<boolean> {
    if (!baseUrl) return false
    const start = Date.now()
    while (Date.now() - start < timeoutMs) {
      try {
        const res = await fetch(`${baseUrl}/api/version`, { signal: AbortSignal.timeout(5000) })
        if (parseVersionData(await res.json()) === expected) return true
      } catch {}
      await sleep(5000)
    }
    return false
  }

  return { ghRun, readVersion, bumpVersion, triggerAndGetRunId, pollWorkflow, verifyVersion }
}
