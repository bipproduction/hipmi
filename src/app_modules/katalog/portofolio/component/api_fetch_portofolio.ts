export { apiCreatePortofolio, apiGetPortofolioById, apiUpdatePortofolioById };

const apiCreatePortofolio = async ({
  profileId,
  data,
}: {
  profileId: string;
  data: any;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const res = await fetch(`/api/portofolio/${profileId}`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json().catch(() => null);
};

const apiGetPortofolioById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const res = await fetch(`/api/portofolio/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json().catch(() => null);
};

const apiUpdatePortofolioById = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const respone = await fetch(`/api/portofolio/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!respone.ok) {
    console.error("Failed to send logs:", respone.statusText);
    return null;
  }

  return await respone.json();
};
