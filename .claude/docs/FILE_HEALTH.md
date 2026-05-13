# FILE-HEALTH — Aturan Ukuran & Struktur File

Aturan ini berlaku untuk semua file dalam project ini.
Tujuan: menjaga file tetap kecil, kohesif, dan mudah diproses oleh AI maupun manusia.

---

## Batas Ukuran File

| Tipe File | Maks Baris | Maks Karakter | Keterangan |
|-----------|-----------|---------------|------------|
| Route handler | 250 | 10.000 | Satu file = satu resource, boleh handle GET/POST/PUT/DELETE |
| Service / use-case | 300 | 12.000 | Satu file = satu domain logic |
| Repository / query | 250 | 10.000 | Pisah per entity |
| Schema / validation | 200 | 8.000 | Pisah per domain |
| Types / interfaces | 300 | 10.000 | Boleh agregat, tapi per modul |
| Utility / helper | 200 | 8.000 | Satu concern per file |
| UI Component (view/page-level) | 300 | 12.000 | Pisah per section jika tumbuh |
| UI Component (button/card/kecil) | 150 | 6.000 | Satu komponen per file |
| Config | 100 | 4.000 | Tidak ada logic bisnis |

> **Hard limit global:** Tidak ada file yang boleh melebihi **500 baris** atau **20.000 karakter**,
> kecuali file yang di-generate otomatis (migration, seed, generated types).

---

## Aturan Wajib

### 1. Satu File, Satu Tanggung Jawab
- Setiap file harus bisa dijelaskan dalam satu kalimat pendek.
- Jika penjelasannya butuh kata "dan" lebih dari sekali → **pecah file-nya**.

### 2. Tidak Ada "God File"
- Dilarang menaruh lebih dari satu route group dalam satu file handler.
- Dilarang mencampur business logic dengan transport layer (HTTP, WS, queue).
- Dilarang mencampur type definition dengan implementation dalam satu file yang panjang.

### 3. Penamaan File Harus Eksplisit

Project ini menggunakan konvensi `snake_case` dengan prefix fungsional:

```
# Fetch / query layer
api_fetch_[domain].ts         → contoh: api_fetch_investasi.ts
api_[domain].ts               → contoh: api_donasi.ts

# UI layer
view_[aksi]_[domain].tsx      → contoh: view_edit_investasi_new.tsx
card_[domain].tsx             → contoh: card_invoice.tsx
button_[aksi]_[domain].tsx    → contoh: button_konfirmasi_transaksi.tsx

# Shared / utility
[domain]_[fungsi].ts          → contoh: generate_seeder.ts
```

Hindari nama generik: `utils.ts`, `helpers.ts`, `common.ts`, `misc.ts`.

### 4. Index File Hanya Untuk Re-export
- File `index.ts` hanya boleh berisi re-export, **bukan** implementasi.
- Maksimal 50 baris untuk file index.

### 5. Tidak Ada Barrel Import yang Dalam
- Hindari barrel yang mengimpor dari barrel lain lebih dari 2 level.
- Ini membuat AI sulit trace dependency dengan akurat.

---

## Kapan Harus Pecah File

Pecah file segera jika salah satu kondisi ini terpenuhi:

- [ ] File melebihi batas baris/karakter di tabel di atas
- [ ] Ada dua fungsi/komponen yang tidak saling bergantung dalam satu file
- [ ] File mengandung lebih dari 3 exported symbol utama
- [ ] File sulit diberi nama yang spesifik tanpa kata "dan"
- [ ] Edit di satu bagian file sering menyebabkan konflik di bagian lain

---

## Pola Pemecahan File yang Dianjurkan

### Route Handler yang Terlalu Besar
```
// SEBELUM: src/app/api/user/[id]/route.ts (700+ baris)

// SESUDAH:
route.ts                      // entry point, delegasi ke handler
user_get_handler.ts           // logic GET
user_update_handler.ts        // logic PUT/PATCH
user_delete_handler.ts        // logic DELETE
```

### UI Component yang Terlalu Besar
```
// SEBELUM: view_edit_investasi_new.tsx (500 baris)

// SESUDAH:
view_edit_investasi_new.tsx   // orchestration, max 150 baris
form_data_investasi.tsx       // bagian form data
form_dokumen_investasi.tsx    // bagian upload dokumen
button_submit_investasi.tsx   // aksi submit
```

### API Fetch yang Terlalu Besar
```
// SEBELUM: api_fetch_user.ts (400 baris)

// SESUDAH:
api_fetch_user_profile.ts     // query profil
api_fetch_user_transaksi.ts   // query transaksi
api_fetch_user_akses.ts       // query hak akses
```

---

## Instruksi Khusus untuk AI

Ketika bekerja dalam project ini, **Claude wajib**:

1. **Menolak menambah kode** ke file yang sudah mendekati atau melebihi batas,
   kecuali penambahannya sangat kecil (< 10 baris) dan kohesif.

2. **Proaktif menyarankan refactor** saat mendeteksi file yang tumbuh tidak sehat,
   sebelum menambahkan fitur baru ke file tersebut.

3. **Tidak membuat "helper dump"** — setiap helper harus punya file sendiri
   yang namanya spesifik sesuai konvensi project, bukan ditumpuk ke file yang ada.

4. **Selalu buat file baru** jika implementasi baru tidak secara alami masuk
   ke salah satu file yang sudah ada.

5. **Periksa ukuran file saat ini** sebelum mengedit — jika sudah > 80% dari
   batas, sarankan pecah terlebih dahulu.

---

## Pengecualian

File berikut **dikecualikan** dari aturan batas ukuran:

- `*.generated.ts` — file hasil code generation (Prisma, tRPC, dll)
- `prisma/seed.ts` — file seeding data
- `src/app/api/seeder/route.ts` — HTTP seeder endpoint
- `src/middleware.tsx` — Next.js middleware, sulit dipecah tanpa kehilangan konteks
- File di folder `__fixtures__/` atau `__mocks__/`

---

*Referensikan file ini di `CLAUDE.md` agar aktif setiap sesi.*
