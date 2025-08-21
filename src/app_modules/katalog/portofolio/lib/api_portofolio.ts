export const apiGetPortofolioByProfile = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/portofolio${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;
  const data: Record<string, any> = await response.json();
  return data;
};

export const apiGetOnePortofolioById = async (path: string, cat: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/portofolio/${path}?cat=${cat}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;
  const data: Record<string, any> = await response.json();
  return data;
};

export const apiDeletePortofolio = async (path: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/portofolio/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};


export const apiGetSubBidangBisnis = async ({id}: {id?: string}) => {
    try {
      // Fetch token from cookie
      const { token } = await fetch("/api/get-cookie").then((res) =>
        res.json()
      );
      if (!token) {
        console.error("No token found");
        return null;
      }

      const bidangBisnisId = id ? `/${id}` : "";
      const response = await fetch(`/api/master/sub-bidang-bisnis${bidangBisnisId}`, {
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
          "Failed to get all forum:",
          response.statusText,
          errorData
        );
        throw new Error(errorData?.message || "Failed to get all forum");
      }

      // Return the JSON response
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error get all forum", error);
      throw error; // Re-throw the error to handle it in the calling function
    }

}