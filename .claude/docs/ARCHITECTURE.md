# Architecture

## Directory Layout

```
src/
  app/                  # Next.js App Router — pages dan API routes
    (auth)/             # Halaman auth (login, register, validasi)
    (admin)/            # Halaman admin dashboard
    (not-user)/         # Waiting room / user belum terverifikasi
    (event-confirmation)/
    (support)/          # Support center, delete account
    api/                # API route handlers
  app_modules/          # Komponen UI per fitur, co-located per domain
    auth/               # Flow login, register, validasi
    home/               # Halaman home
    investasi/          # Modul investasi
    donasi/             # Modul donasi (crowdfunding)
    event/              # Manajemen event
    vote/               # Voting
    job/                # Job board
    forum/              # Forum diskusi
    colab/              # Collaboration tools
    map/                # Peta bisnis (Google Maps)
    katalog/            # Katalog produk/bisnis
    notifikasi/         # Notifikasi
    admin/              # UI admin
    user/               # Profil user
    _global/            # Shared components
    components/         # Komponen generik reusable
    model_global/       # Shared data models/types antar modul
    fun_global/         # Shared utility functions antar modul
  lib/
    prisma.ts           # Singleton Prisma client
    prisma-retry.ts     # Wrapper retry untuk Prisma
    prismaUtils.ts      # Helper Prisma
    APIs.ts             # Centralized fetch helper untuk API calls
    global_state.ts     # Hookstate global state atoms
    routes.ts           # Konstanta route bersama
    router_hipmi/       # Konstanta route halaman per fitur (navigasi client)
    router_admin/       # Konstanta route halaman admin
    api_user_router/    # Konstanta path API (event, job, notifikasi)
    mobile/             # Helper API dan notifikasi khusus mobile
    constans-value/     # Nilai konstanta seluruh app
    warna.ts            # Color palette / token tema Mantine
    id-derectory.ts     # Helper ID/directory
    firebase-admin.ts   # Firebase Admin SDK (push notifications)
    code-otp-sender.ts  # Pengiriman OTP
  util/                 # Fungsi utility level rendah
  bin/
    seeder/             # Data seed
    config/             # Helper konfigurasi
prisma/
  schema.prisma         # Skema database
  seed.ts               # Script seed
```

## Key Architectural Patterns

**Route constants** — Jangan hardcode URL. Gunakan konstanta dari:
- `src/lib/router_hipmi/` → halaman user-facing
- `src/lib/router_admin/` → halaman admin
- `src/lib/api_user_router/` → path API

**Feature modules** — Setiap fitur punya folder di `src/app_modules/<fitur>/` untuk UI, dan API route-nya di `src/app/api/<fitur>/`. Tipe bersama ada di `app_modules/model_global/`, utility bersama di `app_modules/fun_global/`.

**Global state** — Gunakan `@hookstate/core`. Atoms didefinisikan di `src/lib/global_state.ts`. Konvensi penamaan: prefix `g` (global) atau `gs` (global state) untuk accessor.

**Prisma client** — Import dari `src/lib/prisma.ts` (singleton). Gunakan `src/lib/prisma-retry.ts` untuk operasi yang butuh retry. Connection pool: limit=10, pool_timeout=20s, connect_timeout=10s.

**Authentication** — JWT disimpan di cookies. `src/middleware.ts` enforce auth dan RBAC pada page routes. Public routes di-allowlist di konfigurasi middleware. Mobile client pakai endpoint terpisah `/api/auth/mobile-*`.

**Push notifications** — Firebase Admin SDK (`src/lib/firebase-admin.ts`). Helper di `src/lib/mobile/notification/`.

**Payments** — Integrasi Midtrans di `/api/investasi/midtrans/`.

**Real-time** — WebSocket/realtime collaboration di `/api/collaboration/`.

**Email** — Resend API (`RESEND_APIKEY` env var).

**API routes** — Semua di bawah `src/app/api/`. `src/app/api/middleware/route.ts` menangani logika middleware internal.
