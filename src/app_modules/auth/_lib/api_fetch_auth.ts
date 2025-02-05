export {
  apiFetchLogin,
  apiGetCheckCodeOtp,
  apiPostVerifikasiCodeOtp,
  apiDeleteAktivasiKodeOtpByNomor,
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

const apiDeleteAktivasiKodeOtpByNomor = async ({
  nomor,
}: {
  nomor: string;
}) => {
  const respone = await fetch(`/api/auth/code`, {
    method: "DELETE",
    body: JSON.stringify({nomor}),
    headers: {
      "Content-Type": "application/json",
    }
  });

  return await respone.json().catch(() => null);
};
