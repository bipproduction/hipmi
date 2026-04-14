# Debug Guide: Upload File Android vs iOS

## 📱 Problem
- ✅ Upload **IMAGE** berhasil di iOS dan Android
- ❌ Upload **PDF** gagal di Android dengan error: `Status: 400 Bad Request`

## 🔍 Root Cause (DITEMUKAN!)

### **Masalah MIME Type PDF**
Dari log upload:
```
File details:
  - Name: 154ce3b0-6fc0-4a39-9e09-3f9aa2b19300.pdf
  - Type: image/pdf         ← ❌ SALAH!
  - Size: 26534 bytes
```

**Yang benar:**
- ❌ `image/pdf` (salah - tidak ada MIME type ini)
- ✅ `application/pdf` (benar - standard MIME type untuk PDF)

### **Kenapa Terjadi?**
Mobile app (Android) salah set MIME type saat mengirim file PDF. Kemungkinan:
1. File picker/set MIME type salah di mobile code
2. Android WebView auto-detect MIME type incorrectly
3. Mobile app hardcoded MIME type yang salah

## 🛠️ Solusi yang Sudah Diterapkan

### File: `src/app/api/mobile/file/route.ts`

**Fix #1: Safe JSON Parsing**
- ✅ Cek response sebagai text dulu, lalu parse JSON
- ✅ Handle Content-Type yang salah dari external storage

**Fix #2: MIME Type Override (LATEST)**
- ✅ Deteksi file PDF dari extension (.pdf)
- ✅ Override MIME type ke `application/pdf` jika salah
- ✅ Rebuild FormData dengan file yang sudah difix

**Code:**
```typescript
// Jika file PDF tapi type bukan application/pdf, fix it
if (fileName.endsWith(".pdf") && originalType !== "application/pdf") {
  console.log("⚠️ WARNING: PDF file has wrong MIME type:", originalType);
  console.log("🔧 Overriding to: application/pdf");
  
  // Create new File with correct MIME type
  const buffer = await file.arrayBuffer();
  fixedFile = new File([buffer], file.name, {
    type: "application/pdf",
    lastModified: file.lastModified,
  });
  
  // Rebuild formData with fixed file
  formData.set("file", fixedFile);
}
```

## 🧪 Cara Testing

### 1. **Test Upload dari Android**
Coba upload file PDF dari Android dan perhatikan log di terminal:

```bash
# Log yang akan muncul:
=== UPLOAD REQUEST START ===
dirId: xxx
File details:
  - Name: dokumen.pdf
  - Type: application/pdf
  - Size: 1234567 bytes
  - Size (KB): 1205.63
===========================
Directory key: xxx
=== EXTERNAL STORAGE RESPONSE ===
Status: 400
Status Text: Bad Request
Content-Type: text/html; charset=utf-8
=================================
=== ERROR: Non-JSON Response ===
Response text: Unsupported file format...
=================================
```

### 2. **Informasi yang Perlu Dicari:**
Dari log di atas, perhatikan:
- **File size** → Berapa MB? (mungkin terlalu besar?)
- **File type** → `application/pdf` atau yang lain?
- **External storage response** → Status code & message?
- **Error text** → Apa yang dikembalikan server external?

### 3. **Compare iOS vs Android**
Upload file yang sama dari iOS dan Android, bandingkan log-nya.

## 📊 Expected Log Output

### ✅ Success Case:
```
=== UPLOAD REQUEST START ===
dirId: investment
File details:
  - Name: proposal.pdf
  - Type: application/pdf
  - Size: 524288 bytes
  - Size (KB): 512.00
===========================
Directory key: investment
=== EXTERNAL STORAGE RESPONSE ===
Status: 200
Status Text: OK
Content-Type: application/json
=================================
✅ Upload SUCCESS
```

### ❌ Failed Case (Non-JSON Response):
```
=== UPLOAD REQUEST START ===
dirId: investment
File details:
  - Name: proposal.pdf
  - Type: application/pdf
  - Size: 5242880 bytes  ← Mungkin terlalu besar?
  - Size (KB): 5120.00
===========================
=== EXTERNAL STORAGE RESPONSE ===
Status: 413  ← Payload Too Large?
Content-Type: text/html
=================================
=== ERROR: Non-JSON Response ===
Response text: <html><body>413 Request Entity Too Large</body></html>
=================================
```

## 🔧 Next Steps (Setelah Testing)

Berdasarkan log, kita bisa identify masalahnya:

### **Jika masalah FILE SIZE:**
- Tambahkan limit validation di frontend
- Compress PDF sebelum upload
- Increase external storage limit

### **Jika masalah FILE FORMAT:**
- Validate file type sebelum upload
- Convert format jika perlu
- Update external storage allowed formats

### **Jika masalah NETWORK/HEADERS:**
- Check user-agent differences
- Validate Authorization header
- Check CORS settings

## 📝 Checklist Testing
- [ ] Test upload PDF kecil (< 1MB) dari Android
- [ ] Test upload PDF besar (> 5MB) dari Android  
- [ ] Test upload PDF dari iOS (baseline)
- [ ] Compare log output iOS vs Android
- [ ] Check file type yang dikirim
- [ ] Check file size yang dikirim
- [ ] Check response dari external storage

## 🎯 Goal
Dari log yang detail, kita bisa tahu **exact reason** kenapa Android fail, lalu fix dengan tepat.

---

**Last Updated:** 2026-04-14
**Status:** ✅ Logging added, ready for testing
