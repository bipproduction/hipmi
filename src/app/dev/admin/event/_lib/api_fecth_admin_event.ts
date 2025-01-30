export {
  apiGetEventStatusCountDashboard,
  apiGetEventTipeAcara,
  apiGetEventRiwayatCount,
  apiGetDataEventByStatus,
};

const apiGetEventStatusCountDashboard = async ({
  name,
}: {
  name: "Publish" | "Review" | "Reject";
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/event/dashboard/${name}`, {
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

const apiGetEventRiwayatCount = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/event/dashboard/riwayat`, {
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

const apiGetEventTipeAcara = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/event/dashboard/tipe-acara`, {
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

const apiGetDataEventByStatus = async ({
  status,
  page,
  search,
}: {
  status: "Publish" | "Review" | "Reject";
  page: string;
  search: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const isSearch = search ? `&search=${search}` : "";
  const respone = await fetch(`/api/admin/event/${status}${isPage}${isSearch}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await respone.json().catch(() => null);
};
