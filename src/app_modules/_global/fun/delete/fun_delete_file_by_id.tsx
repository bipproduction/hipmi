import { clientLogger } from "@/util/clientLogger";

export async function funDeteleteFileById({
  fileId,
  dirId,
}: {
  fileId: string;
  dirId?: string;
}) {
  try {
    const tokenResponse = await fetch("/api/get-cookie");
    if (!tokenResponse.ok) {
      throw new Error("Failed to get token");
    }
    const { token } = await tokenResponse.json();

    if (!token) {
      return { success: false, message: "Token not found" };
    }

    const res = await fetch("/api/image/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileId, dirId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
