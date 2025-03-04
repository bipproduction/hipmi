export { apiNotifikasiDonasiCheckTransaksiById };

const apiNotifikasiDonasiCheckTransaksiById = async ({
  id,
}: {
  id: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/notifikasi/donasi/transaksi/${id}`, {
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
        "Failed to check donasi transaksi:",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to check donasi transaksi:"
      );
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error to check donasi transaksi:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
