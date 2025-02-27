export const apiGetDataHome = async ({ path }: { path?: string }) => {
  // Fetch token from cookie
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/new/home${path ? path : ""}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // if (!response.ok) return null;
    // const data: Record<string, any> = await response.json();
    // return data;

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get admin contact:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error get admin contact:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiGetNotifikasiHome = async () => {
  // Fetch token from cookie
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/notifikasi/count`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get admin contact:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error get admin contact:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
