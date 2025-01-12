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

  console.log("Ini di pemanggilan API",await response.json());

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
