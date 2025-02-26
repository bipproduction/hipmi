import { apiGetUserProfile } from './../../user/lib/api_user';
export const apiGetUserId = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/user`, {
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

export const apiGetCookiesUser = async () => {
  const response = await fetch(`/api/user/get`);
  return await response.json().catch(() => null);
};

export const apiGetACtivationUser = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/user/activation`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetAllUserWithExceptId = async ({
  exceptId,
}: {
  exceptId?: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isExceptId = exceptId ? `?except-id=${exceptId}` : "";

  const response = await fetch(`/api/user/all${isExceptId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().catch(() => null);
};

export const apiGetUserById = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const response = await fetch(`/api/user/${id}`, {
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
        "Failed to get user",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get user"
      );
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get user:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};