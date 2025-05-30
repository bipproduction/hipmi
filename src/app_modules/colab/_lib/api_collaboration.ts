export const apiGetAllCollaboration = async ({
  kategori,
  page,
}: {
  kategori: "beranda" | "partisipasi" | "proyeksaya" | "grup";
  page: string;
}) => {
  const respone = await fetch(
    `/api/collaboration/get?kategori=${kategori}&page=${page}`
  );
  return await respone.json().catch(() => null);
};

export const apiGetOneCollaborationById = async ({
  id,
  kategori,
  page,
}: {
  id: string;
  kategori: "detail" | "list_partisipan" | "cek_partisipasi";
  page?: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const respone = await fetch(
      `/api/collaboration/${id}?kategori=${kategori}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!respone.ok) {
      const errorData = await respone.json().catch(() => null);
      console.error(
        "Failed to get one collaboration by id",
        respone.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get one collaboration by id"
      );
    }

    const data = await respone.json();
    return data;
  } catch (error) {
    console.error("Error get one collaboration by id", error);
    return null;
  }
};

export const apiGetDataGroupById = async ({
  id,
  kategori,
  page,
}: {
  id: string;
  kategori: "detail" | "info_group";
  page?: string;
}) => {
  const respone = await fetch(
    `/api/collaboration/group/${id}?kategori=${kategori}&page=${page}`
  );

  return await respone.json().catch(() => null);
};

export const apiGetMasterIndustri = async () => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/collaboration/master`, {
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

export const apiCollaborationGetMessageByRoomId = async ({
  id,
  page,
}: {
  id: string;
  page: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }
    const response = await fetch(
      `/api/collaboration/${id}/message?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Error get message by room id:",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to get message by room id");
    }
    return await response.json();
  } catch (error) {
    console.error("Error get message by room id:", error);
    throw error;
  }
};

export const apiGetMessageByRoomId = async ({
  id,
  lastMessageId,
}: {
  id: string;
  lastMessageId?: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    console.log("lastMessageId", lastMessageId);

    let url = `/api/collaboration/${id}/chat`;
    if (lastMessageId) {
      url += `?cursor=${lastMessageId}`;
    }
    const response = await fetch(url, {
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
        "Error get message by room id:",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to get message by room id");
    }
    return await response.json();
  } catch (error) {
    console.error("Error get message by room id:", error);
    throw error;
  }
};

export const apiCollaborationGetRoomById = async ({
  id,
}: {
  id: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }
    const response = await fetch(`/api/collaboration/${id}/room`, {
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
        "Error get room by id:",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to get room by id");
    }
    return await response.json();
  } catch (error) {
    console.error("Error get room by id:", error);
    throw error;
  }
};