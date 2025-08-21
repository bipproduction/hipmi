export async function apiAdminGetListAdmin({
  search,
  page,
}: {
  search?: any;
  page: any;
}) {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isPage = `?page=${page}`;
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/admin/developer${isPage}${isSearch}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get data admin:",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get data admin:", error);
    throw error;
  }
}
