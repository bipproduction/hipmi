import { clientLogger } from "@/util/clientLogger";

export async function funGlobal_DeleteFileById({
  fileId,
  dirId,
}: {
  fileId: string;
  dirId?: string;
}) {
  try {
    const res = await fetch("/api/image/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileId, dirId }),
    });

    const data = await res.json();

    if (data.success) {
      clientLogger.info(`File ${fileId} deleted successfully`);
      return { success: true, message: "File berhasil dihapus" };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    clientLogger.error("Upload error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
