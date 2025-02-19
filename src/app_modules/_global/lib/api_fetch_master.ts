export { apiGetMasterBank, apiGetMasterBidangBisnis, apiGetMasterStatusTransaksi };

const apiGetMasterBank = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const respone = await fetch(`/api/master/bank`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await respone.json().catch(() => null);
};

const apiGetMasterBidangBisnis = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const respone = await fetch(`/api/master/bidang-bisnis`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await respone.json().catch(() => null);
};

const apiGetMasterStatusTransaksi = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/master/status_transaksi`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
      }
  })
  
  return await response.json().catch(() => null);
}