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
    console.error("Upload error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
  // try {
  //   const res = await fetch(
  //     `https://wibu-storage.wibudev.com/api/files/${fileId}/delete`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${process.env.WS_APIKEY}`,
  //       },
  //     }
  //   );

  //   if (res.ok) {
  //     const hasil = await res.json();
  //     return { success: true, message: "File berhasil dihapus" };
  //   } else {
  //     const errorText = await res.json();
  //     return { success: false, message: errorText.message };
  //   }
  // } catch (error) {
  //   console.error("Upload error:", error);
  //   return { success: false, message: "An unexpected error occurred" };
  // }
}
