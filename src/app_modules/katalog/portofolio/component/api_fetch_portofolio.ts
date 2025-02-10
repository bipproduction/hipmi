export {
    apiCreatePortofolio,
};

const apiCreatePortofolio = async ({ data }: { data: any }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const res = await fetch(`/api/portofolio`, {
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
