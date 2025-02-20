export { apiGetEventByStatus, apiGetKontribusiEvent };

const apiGetEventByStatus = async ({
  status,
  page,
}: {
  status: string;
  page: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const isPage = `?page=${page}`;
    const response = await fetch(`/api/event/status/${status}${isPage}`, {
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
      console.error(
        "Error updating portfolio logo:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating portfolio medsos:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetKontribusiEvent = async ({ page }: { page: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const isPage = `?page=${page}`;
    const response = await fetch(`/api/event/kontribusi${isPage}`, {
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
      console.error(
        "Error updating portfolio logo:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating portfolio medsos:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
