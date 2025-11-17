// sendWhatsapp.js

// --- INPUT MANUAL ---
let phoneNumber = "6282340374412";
const codeOtp = "3546";
// ---------------------

phoneNumber = phoneNumber.replace(/\D/g, "");

// Format pesan
const message = 
  `HIPMI - Kode ini bersifat RAHASIA dan JANGAN DI BAGIKAN KEPADA SIAPAPUN, termasuk anggota ataupun pengurus HIPMI lainnya.\n\n` +
  `>> Kode OTP anda: ${codeOtp}.`;

const encodedMessage = encodeURIComponent(message);

const waLink = `https://wa.wibudev.com/code?nom=${phoneNumber}&text=${encodedMessage}`;

console.log("Mengirim request ke server...\n");

// Jalankan HTTP GET
fetch(waLink)
  .then(res => res.text())
  .then(data => {
    console.log("Response dari server:");
    console.log(data);
  })
  .catch(err => {
    console.error("Terjadi error:", err);
  });
