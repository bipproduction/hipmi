export const apiGetPortofolioByProfile = async (path?: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return null;

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
  if (!token) return null;

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
  if (!token) return null;

  const response = await fetch(`/api/new/portofolio/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });


  return await response.json().catch(() => null);
};
