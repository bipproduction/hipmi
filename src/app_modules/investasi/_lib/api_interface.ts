import { data } from "autoprefixer";
export const apiGetOneInvestasiById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/investasi/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetMasterInvestasi = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/investasi/master${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

export const apiGetAllInvestasi = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/investasi${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

export const apiGetAllSahamSaya = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(
    `/api/new/investasi/invoice${path ? path : ""}`,
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

export const apiGetDokumenInvestasiById = async ({
  id,
  kategori,
  page,
}: {
  id: string;
  kategori?: undefined | "get-all";
  page?: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(
    `/api/new/investasi/dokumen/${id}${kategori ? `?kategori=${kategori}&page=${page}` : ""}`,
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

export const apiGetBeritaInvestasiById = async ({
  id,
  kategori,
  page,
}: {
  id: string;
  kategori?: undefined | "get-all";
  page?: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const onCategory = kategori ? `?kategori=${kategori}&page=${page}` : "";

  const response = await fetch(`/api/new/investasi/berita/${id}${onCategory}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};
