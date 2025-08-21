export { apiCreatePinMap };

const apiCreatePinMap = async ({
  portofolioId,
  data,
}: {
  portofolioId: string;
  data: any;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const respone = await fetch(`/api/map/${portofolioId}`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await respone.json().catch(() => null);
};
