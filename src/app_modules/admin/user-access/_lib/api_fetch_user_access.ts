export { apiGetUserAccess };

const apiGetUserAccess = async ({
  page,
  search,
}: {
  page: string;
  search?: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Fetch data
    const isPage = `?page=${page}`;
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/admin/user${isPage}${isSearch}`, {
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
        "Error get data user access:",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error get data user access:", error);
    throw error;
  }
};
