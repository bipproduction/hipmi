export const apiGetAllDonasi = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/donasi${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetMasterDonasi = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/donasi/master${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetAllDonasiSaya = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/donasi/invoice${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetOneDonasiById = async (path: string, kategori: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/donasi/${path}?cat=${kategori}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};


export const apiGetDonasiCeritaPenggalang = async ({ id }: { id: string }) => {
  try {
    console.log("id in Fetch>>", id);
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/donasi/${id}/cerita-penggalang`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to get donasi cerita penggalang", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get donasi cerita penggalang");
    }

    // Return the JSON response
    const data = await response.json();
    console.log("data fetch>>", data);
    return data;
  } catch (error) {
    console.error("Error get donasi cerita penggalang", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
