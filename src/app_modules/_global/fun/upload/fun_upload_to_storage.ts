import { TokenStorage } from "@/app/lib/token";

export async function funGlobal_UploadToStorage({
  file,
  dirId,
}: {
  file: File;
  dirId: string;
}) {
  if (!file) console.log("Tidak ada file");

  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "text/csv",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];

  if (!allowedMimeTypes.includes(file.type)) console.log("File tidak sesuai");

  if (file.size > 100 * 1024 * 1024) console.log("File terlalu besar");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("dirId", dirId);

  try {
    const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${TokenStorage.value}`,
      },
    });

    const dataRes = await res.json();

    if (res.ok) {
      return { success: true, data: dataRes.data };
    } else {
      const errorText = await res.text();
      console.error("Error:", errorText);
      return { success: false, data: {} };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, data: {} };
  }
}
