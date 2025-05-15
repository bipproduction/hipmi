export const apiAdminCreateSticker = async ({ data }: { data: any }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/sticker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to create sticker", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to create sticker");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error create sticker", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiAdminGetSticker = async () => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/sticker`, {
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
      console.error("Failed to get sticker", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get sticker");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get sticker", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

