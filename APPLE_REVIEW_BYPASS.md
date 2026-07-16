# Apple Review Bypass (Backdoor Login OTP)

> **Untuk developer yang meneruskan project ini.** Dokumen ini menjelaskan sebuah
> *backdoor login* yang sengaja ada di server. Baca sampai habis sebelum menyentuh
> alur autentikasi mobile.

## Apa ini?

Server ini adalah API untuk aplikasi mobile. Login mobile normal memakai **OTP**
(kode dikirim via WhatsApp). Masalahnya: saat Apple/Google mereview aplikasi di
App Store / Play Store, **reviewer tidak bisa menerima OTP** (mereka tidak punya
akses ke nomor WhatsApp kita).

Untuk itu ada satu akun khusus yang bisa login **tanpa OTP**:

| Field | Nilai |
|-------|-------|
| Nomor | `6282340374412` |
| Kode OTP | `1234` |

Jika akun ini memasukkan nomor + kode di atas, server menerbitkan sesi tanpa
memverifikasi OTP asli.

## Kenapa ini berisiko & bagaimana kami membatasinya

Backdoor login = risiko keamanan. Siapa pun yang tahu nomor + kode ini bisa login
sebagai akun review. Karena itu backdoor **hanya aktif jika ada flag env eksplisit**:

```bash
ALLOW_APPLE_REVIEW_BYPASS=true
```

- **Default (env kosong / bukan `"true"`)** → backdoor **MATI**. Nomor review
  diperlakukan seperti user biasa (butuh OTP asli).
- **`ALLOW_APPLE_REVIEW_BYPASS=true`** → backdoor **AKTIF**.

Kode: `src/app/api/auth/mobile-validasi/route.ts` (cari komentar `BACKDOOR APPLE REVIEW`).

## Alur penggunaan (SOP)

### Saat submit aplikasi ke Apple/Google untuk review
1. Pastikan akun `6282340374412` **terdaftar** di database server yang di-review
   (kalau tidak ada, login tetap gagal — backdoor cek user harus ada).
2. Set `ALLOW_APPLE_REVIEW_BYPASS=true` di **server tempat mobile app menunjuk saat
   review** (production atau staging — sesuaikan dengan build yang disubmit).
3. Deploy / restart agar env terbaca.
4. Beritahu reviewer credential: nomor `6282340374412`, OTP `1234`.

### Setelah review selesai (WAJIB)
1. Set `ALLOW_APPLE_REVIEW_BYPASS=false` (atau hapus env-nya).
2. Deploy / restart.
3. Verifikasi: coba login dengan nomor+kode review → harus **ditolak** (butuh OTP).

## Cara memastikan status saat ini

```bash
# Di server, cek nilai env:
echo $ALLOW_APPLE_REVIEW_BYPASS
```

- Kosong / `false` → backdoor mati (kondisi aman default).
- `true` → backdoor hidup (hanya boleh selama masa review).

## Rekomendasi jangka panjang

Backdoor ini solusi sementara. Opsi yang lebih aman untuk dipertimbangkan tim:
- Akun review dengan OTP statis yang di-rotate manual, bukan kode `1234`.
- Kode review acak yang di-generate & dibagikan ke reviewer per submission.
- Hapus backdoor sepenuhnya jika Apple/Google mengizinkan demo account lewat
  mekanisme lain.

## Riwayat

- Semula backdoor **selalu aktif** tanpa syarat (risiko: hidup permanen di
  produksi). Diubah menjadi flag `ALLOW_APPLE_REVIEW_BYPASS` (default mati) pada
  branch `fix/security-vote-backdoor`.
