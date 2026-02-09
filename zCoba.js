const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const prisma = new PrismaClient()

// Daftar contoh data
const donationDataList = [
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Bantuan Pendidikan Anak-anak Kurang Mampu",
      "target": 50000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Central Asia",
      "rekening": "1234567890",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Kami ingin membantu anak-anak kurang mampu mendapatkan pendidikan yang layak.",
      "cerita": "Pendidikan adalah hak dasar setiap anak. Namun, banyak anak-anak di pelosok negeri yang tidak bisa menikmati pendidikan karena keterbatasan ekonomi. Melalui kampanye ini, kami ingin mengumpulkan dana untuk membantu biaya pendidikan mereka.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj0"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Pembangunan Masjid di Desa Terpencil",
      "target": 100000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Mandiri",
      "rekening": "0987654321",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Membangun masjid untuk masyarakat di daerah terpencil yang belum memiliki tempat ibadah.",
      "cerita": "Di sebuah desa terpencil, masyarakat setiap hari harus berjalan jauh untuk bisa melaksanakan sholat berjamaah. Kami ingin membantu membangun masjid di tengah-tengah mereka agar ibadah bisa dilakukan dengan lebih tenang dan khusyuk.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj1"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Bantuan Korban Bencana Alam",
      "target": 75000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Rakyat Indonesia",
      "rekening": "5678901234",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Membantu meringankan beban korban bencana alam berupa kebutuhan pokok dan kebutuhan darurat.",
      "cerita": "Beberapa wilayah dilanda bencana banjir dan tanah longsor. Masyarakat kehilangan harta benda dan membutuhkan bantuan segera. Dana yang terkumpul akan digunakan untuk menyediakan makanan, obat-obatan, dan kebutuhan pokok lainnya.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj2"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Pengadaan Alat Medis Rumah Sakit",
      "target": 150000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Negara Indonesia",
      "rekening": "4321098765",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Meningkatkan kualitas pelayanan kesehatan dengan menyediakan alat medis yang lebih baik.",
      "cerita": "Rumah sakit daerah kekurangan alat medis untuk melayani pasien. Melalui donasi ini, kami ingin membantu pengadaan alat-alat medis penting seperti ventilator, USG, dan alat laboratorium untuk meningkatkan kualitas pelayanan kesehatan.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj3"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Program Beasiswa Mahasiswa Berprestasi",
      "target": 80000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Danamon",
      "rekening": "1122334455",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Memberikan kesempatan kepada mahasiswa berprestasi untuk melanjutkan pendidikan tanpa beban biaya.",
      "cerita": "Banyak mahasiswa berprestasi yang tidak mampu melanjutkan pendidikan karena keterbatasan biaya. Program beasiswa ini akan membantu mereka menyelesaikan kuliah hingga sarjana.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj4"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Pengadaan Air Bersih untuk Desa Kekeringan",
      "target": 60000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Permata",
      "rekening": "6677889900",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Menyediakan akses air bersih bagi masyarakat yang tinggal di daerah rawan kekeringan.",
      "cerita": "Beberapa desa mengalami kekeringan setiap tahunnya, membuat warga kesulitan mendapatkan air bersih. Kami ingin membangun sumur bor dan sistem distribusi air untuk membantu masyarakat setempat.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj5"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Pengobatan Gratis untuk Warga Tidak Mampu",
      "target": 40000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Panin",
      "rekening": "9988776655",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Memberikan layanan kesehatan gratis bagi warga yang tidak mampu membayar biaya pengobatan.",
      "cerita": "Banyak warga yang menunda pengobatan karena keterbatasan biaya. Melalui program ini, kami akan menyelenggarakan pengobatan gratis secara berkala di berbagai wilayah.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj6"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Pembangunan Taman Bacaan Masyarakat",
      "target": 35000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank Mega",
      "rekening": "1357924680",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Membangun taman bacaan untuk meningkatkan minat baca masyarakat di wilayah pedesaan.",
      "cerita": "Minat baca masyarakat di pedesaan masih rendah karena keterbatasan akses buku. Taman bacaan ini akan menyediakan ribuan buku gratis dan ruang baca yang nyaman untuk semua usia.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj7"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Pelatihan Keterampilan untuk Pengangguran",
      "target": 55000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank CIMB Niaga",
      "rekening": "2468135790",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Memberikan pelatihan keterampilan untuk membantu pengangguran mendapatkan pekerjaan atau usaha mandiri.",
      "cerita": "Angka pengangguran masih tinggi di beberapa wilayah. Program pelatihan ini akan memberikan keterampilan yang dibutuhkan pasar kerja, seperti menjahit, memasak, teknologi informasi, dan lainnya.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj8"
    }
  },
  {
    "data": {
      "authorId": "cmha6wb9w0001cfndwl9fcse6",
      "title": "Renovasi Gedung Sekolah Rusak",
      "target": 90000000,
      "donasiMaster_DurasiId": 3,
      "donasiMaster_KategoriId": 3,
      "namaBank": "Bank OCBC NISP",
      "rekening": "1029384756",
      "imageId": "cm60j9q3m000xc9dc584v8rh8",
      "pembukaan": "Merestrukturasi gedung sekolah yang rusak agar siswa bisa belajar dengan aman dan nyaman.",
      "cerita": "Banyak gedung sekolah yang rusak parah dan membahayakan keselamatan siswa. Dana dari kampanye ini akan digunakan untuk renovasi dan perbaikan gedung sekolah yang membutuhkan.",
      "imageCeritaId": "cm60j9q3m000xc9dc584v8rj9"
    }
  }
];

async function sendDonationData() {
  const baseUrl = 'http://localhost:3000/api/mobile/donation'; // Sesuaikan dengan URL server Anda
  const headers = {
    'Content-Type': 'application/json',
  };

  for (let i = 0; i < donationDataList.length; i++) {
    try {
      console.log(`Mengirim data ke-${i + 1}...`);
      const response = await axios.post(`${baseUrl}?category=permanent`, donationDataList[i], {
        headers: headers
      });
      console.log(`Data ke-${i + 1} berhasil dikirim:`, response.data);
    } catch (error) {
      console.error(`Error saat mengirim data ke-${i + 1}:`, error.response?.data || error.message);
    }
  }
}

async function main() {
  // Menjalankan fungsi untuk mengirim data donasi
  await sendDonationData();

  // Fungsi asli untuk update notifikasi
  const result = await prisma.notifikasi.updateMany({
    where: {
      recipientId: 'cmha7p6yc0000cfoe5w2e7gdr',
    },
    data: {
      isRead: false,
      readAt: null,
    },
  })

  console.log(`✅ Rows affected: ${result.count}`)
}

main()
  .catch((err) => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
