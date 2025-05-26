export const apiGetAllMap = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/new/map${path ? path : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetOneMapById = async (path: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  
  const response = await fetch(`/api/new/map/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetOneMapByPortofolioId = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/map/${id}/portofolio`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to get one map by portofolio id", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get one map by portofolio id");
    }

    // Return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get one map by portofolio id", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};