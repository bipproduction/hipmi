export {
  apiGetAdminDonasiStatusCountDashboard,
  apiGetAdminDonasiKategoriCountDashboard,
  apiGetAdminDonasiByStatus,
  apiGetAdminDonasiKategori,
  apiGetAdminDonasiById,
  apiGetAdminAllDaftarDonatur,
  apiGetAdminStatusDaftarDonatur,
  apiGetAdminDonasiCountDonatur,
  apiGetAdminDonasiPencairan,
};
const apiGetAdminDonasiStatusCountDashboard = async ({
  name,
}: {
  name: "Publish" | "Review" | "Reject";
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/donasi/dashboard/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

const apiGetAdminDonasiKategoriCountDashboard = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/donasi/dashboard/kategori`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control_Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

const apiGetAdminDonasiByStatus = async ({
  name,
  page,
  search,
}: {
  name: "Publish" | "Review" | "Reject";
  page: string;
  search: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const isSearch = search ? `&search=${search}` : "";
  const response = await fetch(
    `/api/admin/donasi/status/${name}${isPage}${isSearch}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json().catch(() => null);
};
const apiGetAdminDonasiKategori = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/donasi/kategori`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};
const apiGetAdminDonasiById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/donasi/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};
const apiGetAdminAllDaftarDonatur = async ({
  id,
  page,
  status,
}: {
  id: string;
  page: string;
  status?: string | undefined;
}) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isStatus = status ? `&status=${status}` : "";
    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(
      `/api/admin/donasi/${id}/donatur${isPage}${isStatus}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get daftar donatur:",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error get daftar donatur:", error);
    throw error;
  }
};

const apiGetAdminStatusDaftarDonatur = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/master/status_transaksi`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

const apiGetAdminDonasiCountDonatur = async ({ id }: { id: string }) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/donasi/${id}/count`, {
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
        "Error get count donatur:",
        errorData?.message || "Unknown error"
      );
      return null;
    }
    const data = await response.json().catch(() => null);
    return data;
  } catch (error) {
    console.error("Error get count donatur:", error);
    throw error;
  }
};

const apiGetAdminDonasiPencairan = async ({
  id,
  page,
}: {
  id: string;
  page: string;
}) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(
      `/api/admin/donasi/${id}/pencairan?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get pencairan donasi:",
        errorData?.message || "Unknown error"
      );
      return null;
    }
    const data = await response.json().catch(() => null);
    return data;
  } catch (error) {
    console.error("Error get pencairan donasi:", error);
    throw error;
  }
};
