import { TokenStorage } from "@/app/lib/token";

export async function funGlobal_UploadToStorage({
  file,
  dirId,
}: {
  file: File;
  dirId: string;
}) {
  const Env_WS_APIKEY = TokenStorage.value;

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

  // if (!allowedMimeTypes.includes(file.type)) console.log("File tidak sesuai");
  if (!allowedMimeTypes.includes(file.type)) {
    console.error("File tidak sesuai");
    return { success: false, message: "File type not allowed" };
  }

  if (file.size > 100 * 1024 * 1024) {
    console.error("File terlalu besar");
    return { success: false, message: "File size exceeds limit" };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // Timeout 30 detik

  const formData = new FormData();
  formData.append("file", file);
  formData.append("dirId", dirId);

  try {
    const res = await fetch("https://wibu-storage.wibudev.com/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Env_WS_APIKEY}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Bersihkan timeout jika selesai tepat waktu

    if (res.ok) {
      const dataRes = await res.json();
      return { success: true, data: dataRes.data };
    } else {
      const errorText = await res.text();
      console.error("Error:", errorText);
      return { success: false, message: errorText };
    }
  } catch (error) {
    clearTimeout(timeoutId); //

    console.error("Error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
