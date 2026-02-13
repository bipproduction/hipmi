
File utama: src/app/api/mobile/admin/master/business-field/route.ts

Terapkan pagination pada file "File utama" pada method GET
Analisa juga file "File utama", jika belum memiliki page dari seachParams maka terapkan. Juga pastikan take dan skip sudah sesuai dengan pagination. Buat default nya menjadi 10 untuk take data

Contoh:
const page = Number(searchParams.get("page"));
const takeData = 10;
const skipData = page * takeData - takeData;

dan penerapannya pada query
take: page ? takeData : undefined,
skip: page ? skipData : undefined,

Gunakan bahasa indonesia pada cli agar saya mudah membacanya.

<!-- Additinal prompt -->
File refrensi: src/app/api/mobile/event/[id]/[status]/route.ts
Anda bisa menggunakan refrensi dari "File refrensi" jika butuh pemahaman dengan tipe fitur yang sama


<!-- Auto input promt -->
End-point: src/app/api/mobile/donation/route.ts

Buatkan auto input untuk method POST dengan data yang dibutuhkan sesuai dengan struktur data yang ada di file tersebut, tidak perlu "temporary"  cukup data "permanent" dengan ketentuan sebagai berikut:
- authorId: string ( cmha6wb9w0001cfndwl9fcse6 )
- title: string
- target: number
- donasiMaster_DurasiId: number ( 3 )
- donasiMaster_KategoriId: number ( 3 )
- namaBank: string
- rekening: string
- imageId: number ( cm60j9q3m000xc9dc584v8rh8 )

Untuk sisa nya anda bisa bebas mengisi data tersebut.

<!-- COMMIT & PUSH -->
Branch: mobile-api/10-feb-26
Jalankan perintah ini: git checkout -b "Branch"
Setelah itu jalankan perintah ini: git add .
Setelah itu jalankan perintah ini: git commit -m "
<Berikan semua catatan perubahan pada branch ini, tampilan pada saya dan pastikan dalam bahasa indonesia. Saya akan cek baru saya akan berikan perintah push>
"
Setelah itu jalankan perintah ini: git push origin "Branch"