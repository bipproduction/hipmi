export {
  apiGetMasterBank,
  apiGetMasterBidangBisnis,
  apiGetMasterStatusTransaksi,
  apiGetAdminContact,
  apiGetMasterEmotions,
  apiGetMasterIndustri,
};

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
    },
  });

  return await response.json().catch(() => null);
};

const apiGetAdminContact = async () => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const response = await fetch(`/api/master/admin-contact`, {
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
        "Error get admin contact:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error get admin contact:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetMasterEmotions = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/master/emotions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};
const apiGetMasterIndustri = async () => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/master/industri`, {
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
        "Error get master industri:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error get master industri:", error);
    throw error;
  }
};