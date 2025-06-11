export {
  apiFetchLogin,
  apiGetCheckCodeOtp,
  apiPostVerifikasiCodeOtp,
  apiDeleteAktivasiKodeOtpByNomor,
  apiFetchRegister,
  apiFetchLogout,
};

const apiFetchLogin = async ({ nomor }: { nomor: string }) => {
  const respone = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ nomor: nomor }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await respone.json().catch(() => null);
};

const apiGetCheckCodeOtp = async ({ id }: { id: string }) => {
  const respone = await fetch(`/api/auth/check/${id}`);

  return await respone.json().catch(() => null);
};

const apiPostVerifikasiCodeOtp = async ({ nomor }: { nomor: string }) => {
  const respone = await fetch("/api/auth/validasi", {
    method: "POST",
    body: JSON.stringify({ nomor: nomor }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await respone.json().catch(() => null);
};

const apiDeleteAktivasiKodeOtpByNomor = async ({ id }: { id: string }) => {
  const respone = await fetch(`/api/auth/code/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await respone.json().catch(() => null);
};

const apiFetchRegister = async ({
  nomor,
  username,
}: {
  nomor: string;
  username: string;
}) => {
  const data = {
    username: username,
    nomor: nomor,
  };
  const respone = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await respone.json();

  return result;
  // return await respone.json().catch(() => null);
};


const apiFetchLogout = async ({ id }: { id: string }) => {
  const respone = await fetch(`/api/auth/logout?id=${id}`, {
    method: "GET",
  });

  const result = await respone.json();

  return result;
};