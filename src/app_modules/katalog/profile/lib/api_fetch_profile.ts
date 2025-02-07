import { MODEL_PROFILE } from "../model/interface";

export { apiUpdateProfile, apiGetOneProfileById };

const apiGetOneProfileById = async ({ id }: { id: string }) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const res = await fetch(`/api/profile/${id}`, {
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

const apiUpdateProfile = async ({ data }: { data: MODEL_PROFILE }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const res = await fetch(`/api/profile/${data.id}`, {
    method: "PUT",
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
