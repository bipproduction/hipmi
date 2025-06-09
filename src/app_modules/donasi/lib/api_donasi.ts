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

  // const response = await fetch(`/api/new/donasi/${path}?cat=${kategori}`, {
  const response = await fetch(`/api/donasi/${path}?cat=${kategori}`, {
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
      console.error(
        "Failed to get donasi cerita penggalang",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get donasi cerita penggalang"
      );
    }

    // Return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get donasi cerita penggalang", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiGetTemporaryCreate = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/donasi/${id}/temporary-create`, {
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
        "Failed to get donasi temporary create",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get donasi temporary create"
      );
    }

    // Return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get donasi temporary create", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiGetDonasiInvoiceById = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/donasi/${id}/invoice`, {
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
        "Failed to get donasi invoice",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to get donasi invoice");
    }

    // Return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get donasi invoice", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiGetCountDonatur = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/donasi/${id}/invoice/count`, {
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
        "Failed to get donasi invoice count",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get donasi invoice count"
      );
    }

    // Return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get donasi invoice count", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const apiGetDonasiKabarById = async ({ id }: { id: string }) => {
    try {
      // Fetch token from cookie
      const { token } = await fetch("/api/get-cookie").then((res) => res.json());
      if (!token) {
        console.error("No token found");
        return null;
      }

      const response = await fetch(`/api/donasi/kabar/${id}`, {
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
          "Failed to get donasi kabar",
          response.statusText,
          errorData
        );
        throw new Error(errorData?.message || "Failed to get donasi kabar");
      }

      // Return the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error get donasi kabar", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };