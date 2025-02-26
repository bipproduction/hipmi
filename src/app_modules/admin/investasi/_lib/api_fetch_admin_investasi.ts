import { globalStatusTransaksi } from "@/app_modules/_global/lib/master_list_app";

export {
  apiGetAdminInvestasiCountDashboard,
  apiGetAdminInvestasiByStatus,
  apiGetAdminInvestasiById,
  apiGetAdminAllTransaksiById,
  apiGetAdminStatusTransaksi,
};
const apiGetAdminInvestasiCountDashboard = async ({
  name,
}: {
  name: "Publish" | "Review" | "Reject";
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/investasi/dashboard/${name}`, {
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

const apiGetAdminInvestasiByStatus = async ({
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
    `/api/admin/investasi/status/${name}${isPage}${isSearch}`,
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

  return await response.json().catch(() => null);
};

const apiGetAdminInvestasiById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/investasi/${id}/detail`, {
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

const apiGetAdminAllTransaksiById = async ({
  id,
  page,
  status,
}: {
  id: string;
  page: string;
  status?: string | undefined;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Fetch data
    const isStatus = status ? `&status=${status}` : "";
    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(
      `/api/admin/investasi/${id}/transaksi${isPage}${isStatus}`,
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

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get data transaksi invetsasi",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error get data transaksi invetsasi", error);
    throw error;
  }
};

const apiGetAdminStatusTransaksi = async () => {
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
