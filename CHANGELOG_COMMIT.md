## Catatan Perubahan untuk Commit

### Fitur: Penambahan Pagination pada Endpoint Admin Mobile

#### Deskripsi Umum
Telah dilakukan penambahan fitur pagination pada beberapa endpoint admin mobile untuk meningkatkan kinerja dan pengalaman pengguna saat mengakses data dalam jumlah besar.

#### File yang Diubah

1. **src/app/api/mobile/admin/job/route.ts**
   - Ditambahkan parameter `page` dari `searchParams`
   - Diterapkan logika pagination dengan `takeData` (default 10) dan `skipData`
   - Query `prisma.job.findMany` telah dimodifikasi untuk mendukung pagination

2. **src/app/api/mobile/admin/event/route.ts**
   - Diperbaiki definisi variabel `page` untuk memastikan tipe data yang konsisten
   - Ditambahkan default value 1 untuk parameter `page`
   - Perhitungan `skipData` disesuaikan agar lebih efisien

3. **src/app/api/mobile/admin/event/[id]/participants/route.ts**
   - Ditambahkan parameter `page` dari `searchParams`
   - Diterapkan logika pagination dengan `takeData` (default 10) dan `skipData`
   - Query `prisma.event_Peserta.findMany` telah dimodifikasi untuk mendukung pagination

#### Tujuan Perubahan
- Meningkatkan kinerja aplikasi saat mengambil data dalam jumlah besar
- Memungkinkan pengguna untuk mengakses data secara bertahap melalui halaman-halaman
- Mengurangi beban server saat mengambil data dalam jumlah besar
- Memberikan pengalaman pengguna yang lebih baik saat mengakses data admin

#### Cara Penggunaan
Untuk menggunakan fitur pagination, cukup tambahkan parameter `page` pada query string saat melakukan permintaan ke endpoint yang telah dimodifikasi. Contoh:
```
GET /api/mobile/admin/job?page=2
GET /api/mobile/admin/event?page=3
GET /api/mobile/admin/event/{id}/participants?page=1
```

Default jumlah data per halaman adalah 10 item.