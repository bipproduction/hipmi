export { apiGetPdfToImage };

export interface PageData {
  imageUrl: string;
  pageNumber: number;
}

interface PdfResponse {
  pages: PageData[];
  totalPages: number;
}
const apiGetPdfToImage = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    // const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    // if (!token) {
    //   console.error("No token found");
    //   return null;
    // }

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY20wdXIxeXh3MDAwMDU2bnNqbHI2MTg3cCIsIm5hbWUiOiJiYWdhcyIsImVtYWlsIjoiYmFnYXNAZ21haWwuY29tIn0sImlhdCI6MTcyNTg3MTAzNiwiZXhwIjo0ODgxNjMxMDM2fQ.wFQLcrJj66wFeqIMYk2esMx3ULaHK6RFxkiToaLCuko";

    // Anda bisa menggunakan prospektusId di URL jika diperlukan
    const pdfUrl = `https://wibu-storage.wibudev.com/api/pdf-to-image?url=https://wibu-storage.wibudev.com/api/files/${id}`;

    const response = await fetch(pdfUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Failed get file",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    const jsonData: PdfResponse = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error get file", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
