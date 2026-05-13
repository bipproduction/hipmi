# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HIPMI adalah aplikasi web Next.js 14 (App Router) untuk platform Himpunan Pengusaha Muda Indonesia. Fitur utama: investasi, donasi, event, voting, job board, forum, kolaborasi, dan peta bisnis — dengan web frontend sekaligus mobile API endpoints untuk companion app.

**Stack:** Next.js, TypeScript, Prisma (PostgreSQL), Mantine UI v6/v7, Hookstate, Bun.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server (HTTPS, lihat certificates/)
bun run build        # Build production
bun run lint         # Lint (next lint)
bun prisma generate  # Generate Prisma client
bun prisma db push   # Push skema ke database
bun prisma db seed   # Seed database
bun run ver          # Bump versi & generate changelog
```

Seed via HTTP (lokal saja): `GET /api/seeder?dev=DEV-HIPMI`

Tidak ada automated test — verifikasi via lint dan manual.

## Conventions

- **Commit** ikuti Conventional Commits: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`
- **Branch** pakai format `<type>/<deskripsi>` (contoh: `server/14-apr-26`)
- **Staging** — gunakan `git add <file-spesifik>`, hindari `git add -A`
- **URL/route** — jangan hardcode, gunakan konstanta dari `src/lib/router_hipmi/`, `src/lib/router_admin/`, atau `src/lib/api_user_router/`
- **Global state** — prefix fungsi dengan `g` (global) atau `gs` (global state)

## Detail Lebih Lanjut

See @.claude/docs/ARCHITECTURE.md

See @.claude/docs/ENVIRONMENT.md

See @.claude/docs/FILE_HEALTH.md
