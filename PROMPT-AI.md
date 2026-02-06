
File utama: src/app/api/mobile/investment/[id]/invoice/route.ts

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