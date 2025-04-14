export { apiGetNotifikasiByUserId, apiPostIsReadNotifikasi };

const apiGetNotifikasiByUserId = async ({
  page,
  id,
}: {
  page?: string;
  id: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(`/api/admin/notifikasi/${id}${isPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to get notifikasi admin", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get notifikasi admin");
    }

    // Return the JSON response
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error get all forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiPostIsReadNotifikasi = async ({
  id,
  isRead,
}: {
  id: string;
  isRead: boolean;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/notifikasi/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isRead }),
    });    

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to post notifikasi admin", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to post notifikasi admin");
    }

    // Return the JSON response 
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error get all forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};  