# HIPMI Project

## Bip Production @ 27-07-2023

### Project

__Team__

| name   | des                     |
| ------ | ----------------------- |
| bagas  | frontend, devOps        |
| lukman | frontend, ui        |
| lia    | backend , frontend , QC |
| malik  | leader                  |

### Source

| name            | des                            |
| --------------- | ------------------------------ |
| server          | debian 11                      |
| framework       | Nextjs                         |
| database        | Postgres                       |
| Ui              | Mantin                         |
| Teknologi       | Javascript, Nodejs, Typescript |
| Service Manager | Pm2                            |

### note 
1. panter module bisa mengikuti contoh
2. untuk commit beri keterangan lengkap dan jelas
    
    **PANTERN**
    1. Tag Commit (Commit Tag)
    2. Deskripsi (Description)
    3. Body
    4. Referensi Isu (Issue References)
    
    **CONTOH**
    ```txt
    feat: Tambahkan fitur kalkulator

    Deskripsi:
    - Menambahkan fungsi penambahan, pengurangan, perkalian, dan pembagian
    - Memperbolehkan pengguna untuk memasukkan dua angka dan melakukan operasi matematika

    Fixes #12
    ```

    **REFRENSI**

   1. **`fix`**: Digunakan untuk menandakan perbaikan bug atau masalah yang ada dalam kode.

   Contoh:
   ```
   fix: Perbaiki bug tampilan pada halaman profil

   Deskripsi:
   - Mengatasi masalah tampilan yang menyebabkan foto profil tumpang tindih dengan teks

   Fixes #55
   ```

   1. **`docs`**: Digunakan ketika melakukan perubahan pada dokumentasi proyek, seperti menambahkan atau mengedit komentar, README, atau file dokumentasi lainnya.

   Contoh:
   ```
   docs: Update README dengan panduan instalasi

   Deskripsi:
   - Menyediakan petunjuk langkah demi langkah tentang cara menginstal dan menjalankan proyek

   No Issue
   ```

   1. **`chore`**: Digunakan untuk komit yang berhubungan dengan pekerjaan rutin, seperti pembaruan dependensi, pengaturan konfigurasi, atau tugas administratif lainnya.

   Contoh:
   ```
   chore: Pembaruan versi library requests

   Deskripsi:
   - Memperbarui library requests ke versi terbaru untuk meningkatkan keamanan dan kinerja

   No Issue
   ```

   1. **`refactor`**: Digunakan ketika melakukan refaktorisasi kode, yaitu mengubah struktur atau tata letak kode tanpa mengubah perilaku yang terlihat dari luar.

   Contoh:
   ```
   refactor: Ubah struktur kode halaman detail produk

   Deskripsi:
   - Memisahkan logika tampilan dari logika bisnis untuk meningkatkan keterbacaan dan pemeliharaan kode

   No Issue
   ```

   1. **`test`**: Digunakan ketika melakukan perubahan atau penambahan tes atau skrip pengujian.

   Contoh:
   ```
   test: Tambahkan tes unit untuk fungsi kalkulator

   Deskripsi:
   - Menulis tes unit untuk memastikan fungsi kalkulator berjalan dengan benar

   No Issue
   ```

   1. **`style`**: Digunakan ketika melakukan perubahan pada tampilan atau gaya kode, tanpa mengubah logika atau perilaku program.

   Contoh:
   ```
   style: Atur tata letak tombol 'Masuk'

   Deskripsi:
   - Memperbaiki tampilan tombol 'Masuk' pada halaman login agar lebih serasi

   No Issue
   ```

   1. **`perf`**: Digunakan ketika melakukan perubahan untuk meningkatkan kinerja aplikasi atau mengoptimalkan kode.

   Contoh:
   ```
   perf: Optimalkan penggunaan sumber daya gambar

   Deskripsi:
   - Mengurangi ukuran gambar dan mengimplementasikan caching untuk mempercepat waktu muat halaman

   Fixes #102
   ```
3. lakukan push dengan tahapan yang benar jangan menggunakan `git add -A ` tapi sesuai yang diedit atau yang di create saja

    **REFRENSI**

   1. **`git status`**: Pertama, periksa status repositori menggunakan perintah `git status`. Ini akan memberikan daftar perubahan yang belum ditambahkan ke area staging (unstaged changes) dan perubahan yang telah ditambahkan ke area staging (changes to be committed).

   2. **`git add`**: Tambahkan perubahan ke area staging menggunakan perintah `git add`. Misalnya, jika Anda ingin menambahkan semua perubahan, gunakan `git add .`, atau jika ingin menambahkan file tertentu, gunakan `git add <nama_file>`.

   3. **`git commit`**: Setelah perubahan ditambahkan ke area staging, lakukan commit perubahan menggunakan perintah `git commit -m "pesan_commit"`. Pastikan pesan commit yang Anda cantumkan informatif dan jelas mengenai perubahan yang Anda lakukan.

   4. **`git pull`**: Sebelum melakukan `push`, disarankan untuk melakukan `git pull` terlebih dahulu untuk mengambil perubahan terbaru dari repositori pusat (remote repository) dan memastikan bahwa Anda bekerja di atas versi terbaru dari branch yang Anda gunakan.

   5. **`git push`**: Jika tidak ada konflik dengan versi terbaru dari repositori pusat, Anda dapat melakukan `push` perubahan Anda ke repositori menggunakan perintah `git push`. Pastikan Anda memiliki izin yang cukup untuk melakukan `push` ke branch yang sedang Anda kerjakan.

   6. **`git log`**: Setelah `push`, gunakan perintah `git log` untuk memeriksa daftar commit yang telah Anda lakukan. Ini memastikan bahwa perubahan Anda berhasil tercatat di repositori.

    *note*

    - single file 
    
        git add index.html
    - multi file

        git add file1.txt file2.js file3.css
    - dir atau folder

        git add assets/

### Info Umum Git

### Inisialisasi dan Kloning Repository:
- `git init`: Menginisialisasi repositori Git baru di direktori lokal.
- `git clone <URL>`: Mengkloning repositori dari GitHub ke direktori lokal.

### Pengelolaan Perubahan:
- `git status`: Menampilkan status perubahan dalam repositori.
- `git add <file/folder>`: Menambahkan file atau folder ke area staging untuk dimasukkan ke dalam commit.
- `git commit -m "pesan_commit"`: Membuat commit untuk menyimpan perubahan yang sudah ditambahkan ke area staging dengan pesan commit tertentu.
- `git push`: Mengirim perubahan dari repositori lokal ke repositori pusat (remote repository) di GitHub.
- `git pull`: Mengambil perubahan terbaru dari repositori pusat ke repositori lokal.

### Pengelolaan Branch:
- `git branch`: Menampilkan daftar branch yang ada dalam repositori.
- `git branch <nama_branch>`: Membuat branch baru dengan nama tertentu.
- `git checkout <nama_branch>`: Beralih ke branch tertentu.
- `git merge <nama_branch>`: Menggabungkan branch tertentu ke branch aktif.
- `git branch -d <nama_branch>`: Menghapus branch tertentu.

### Pengelolaan Remote Repository (GitHub):
- `git remote`: Menampilkan daftar remote repository yang terhubung dengan repositori lokal.
- `git remote add <nama_remote> <URL>`: Menambahkan remote repository baru ke repositori lokal.
- `git remote remove <nama_remote>`: Menghapus remote repository tertentu dari repositori lokal.

### Sinkronisasi dengan Repositori Pusat (Pull Request):
- `git fetch`: Mengambil perubahan dari repositori pusat tanpa menggabungkannya dengan branch aktif.
- `git pull origin <nama_branch>`: Mengambil perubahan dari repositori pusat dan menggabungkannya dengan branch aktif.
- `git push origin <nama_branch>`: Mengirim perubahan dari branch lokal ke branch yang sesuai di repositori pusat.

### Log dan Pencarian Commit:
- `git log`: Menampilkan log commit dalam repositori.
- `git log --oneline`: Menampilkan log commit dalam satu baris.
- `git log --author="nama_pengguna"`: Menampilkan log commit berdasarkan nama pengguna.
- `git log --grep="kata_kunci"`: Mencari commit berdasarkan kata kunci tertentu.

### Pembatalan Perubahan:
- `git reset <file>`: Membatalkan perubahan yang belum ditambahkan ke area staging.
- `git reset --soft HEAD~1`: Membatalkan commit terakhir dan mengembalikan perubahan ke area staging.
- `git reset --hard HEAD~1`: Menghapus commit terakhir dan mengembalikan perubahan ke kondisi sebelum commit tersebut.

### Lainnya:
- `git config`: Mengatur konfigurasi Git, seperti nama pengguna dan alamat email.
- `git stash`: Menyimpan perubahan sementara untuk diterapkan nanti.
- `git tag <nama_tag>`: Menandai titik spesifik dalam sejarah commit untuk memudahkan referensi di masa mendatang.


### Standar Komentar Pada File

1. **Komentar Header File**: Pada awal file TypeScript, sebaiknya tambahkan komentar header yang menjelaskan tentang isi file, tujuan file, penulis, tanggal pembuatan, dll.

```typescript
/**
 * Nama File: app.ts
 * Deskripsi: Ini adalah file utama aplikasi.
 * Pembuat: John Doe
 * Tanggal: 27 Juli 2023
 */
```

2. **Komentar Fungsi**: Setiap fungsi harus diikuti dengan komentar yang menjelaskan fungsionalitasnya, parameter yang diterima, dan nilai yang dikembalikan (jika ada).

```typescript
/**
 * Fungsi untuk menambahkan dua angka.
 * @param {number} a - Angka pertama.
 * @param {number} b - Angka kedua.
 * @returns {number} Hasil penjumlahan a dan b.
 */
function addNumbers(a: number, b: number): number {
  return a + b;
}
```

3. **Komentar Variabel**: Komentar juga diperlukan untuk menjelaskan variabel yang digunakan, terutama jika namanya tidak cukup deskriptif.

```typescript
// Nilai maksimum yang diizinkan
const maxLimit = 100;

// Nama pelanggan saat ini
let currentCustomer: string;
```

4. **Komentar Tipe Data Kustom**: Jika Anda mendefinisikan tipe data kustom, komentar berguna untuk menjelaskan properti-properti yang dimiliki oleh tipe data tersebut.

```typescript
/**
 * Interface untuk merepresentasikan informasi pelanggan.
 */
interface Customer {
  id: number; // ID pelanggan
  name: string; // Nama pelanggan
  age?: number; // Umur pelanggan (opsional)
}
```

5. **Komentar Penanganan Error**: Jika Anda memiliki blok penanganan error, berikan komentar yang menjelaskan tindakan apa yang diambil untuk menangani kesalahan tertentu.

```typescript
try {
  // Potensi kode yang bisa menimbulkan kesalahan
} catch (error) {
  // Kesalahan: tindakan apa yang diambil?
}
```

6. **Komentar Tambahan**: Berikan komentar tambahan pada bagian yang kompleks atau penting dalam kode untuk membantu pengembang lain memahami alur logika atau pengambilan keputusan.

```typescript
// Periksa apakah pelanggan memiliki diskon
if (isDiscountAvailable(customer)) {
  // Diskon berlaku: apa yang harus dilakukan?
}
```


### Task

1. auth [login, registrasi]
2. landing page user
3. dashboard user
4. dashboard super admin
5. dashboard admin
6. halaman data struktur
7. halaman tentang kami
8. halaman tentang kami sejarah
9. halaman tentang kami visi misi
10. halaman asset
11. halaman informasi
12. halaman informasi berita
13. halaman informasi pengumuman
14. halaman informasi galery
15. api
16. database


v.1.2.3
    

