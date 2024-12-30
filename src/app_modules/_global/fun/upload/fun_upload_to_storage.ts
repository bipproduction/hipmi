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
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dirId", dirId);

  const upload = await fetch("/api/image/upload", {
    method: "POST",
    body: formData,
  });

  const res = await upload.json();

  if (upload.ok) {
    return { success: true, data: res.data, message: res.message };
  } else {
    return { success: false, data: {}, message: res.message };
  }
}
