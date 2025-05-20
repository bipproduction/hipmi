import { IEventSponsor } from "./interface";

export const apiGetEventDetailById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/event/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

export const apiGetEventCekPeserta = async ({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(
    `/api/event/check-peserta?userId=${userId}&eventId=${eventId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json().catch(() => null);
};

export const apiGetEventPesertaById = async ({
  id,
  page,
}: {
  id: string;
  page: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/event/peserta/${id}?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

// =============== SPONSOR =============== //

export const apiGetEventCreateSponsor = async ({
  id,
  data,
}: {
  id: string;
  data: IEventSponsor;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/event/sponsor/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

export const apiGetEventSponsorListById = async ({
  id,
  page,
}: {
  id: string;
  page: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";

  const response = await fetch(`/api/event/sponsor/list/${id}${isPage}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

export const apiGetOneSponsorEventById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/event/sponsor/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};

export const apiGetEventKonfirmasiById = async ({ id, userId }: { id: string; userId: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/event/${id}/konfirmasi?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to get event konfirmasi", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get event konfirmasi");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get event konfirmasi", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};