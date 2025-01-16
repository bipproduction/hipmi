export async function funUploadFileToStorage({
  file,
  dirId,
}: {
  file: File;
  dirId: string;
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dirId", dirId);

    const upload = await fetch("/api/image/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await upload.json();

    return upload.ok
      ? { success: true, data: res.data, message: res.message }
      : { success: false, data: {}, message: res.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
