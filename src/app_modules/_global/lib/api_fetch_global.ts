export { apiGetPdfToImage, apiCreatedNotificationToAdmin, apiGetSeasonUserId };

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
      console.error("Failed get file", errorData?.message || "Unknown error");

      return null;
    }

    const jsonData: PdfResponse = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error get file", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiCreatedNotificationToAdmin = async ({ data }: { data: any }) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/notifications/to-admin`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Failed to created notifications",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to created notifications");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error to created notifications", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetSeasonUserId = async () => {
  try {
    const response = await fetch(`/api/season`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Failed to created notifications",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to created notifications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error get user id", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiNewGetUserIdByToken = async () => {
  try {
    const response = await fetch(`/api/user/id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Failed to get user id",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to get user id");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get user id", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
  