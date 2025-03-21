export {
  apiGetAdminCollaborationStatusCountDashboard,
  apiGetAdminCollaborationPublish,
  apiGetAdminCollaborationReject,
  apiGetAdminCollaborationRoomById,
  apiGetAdminCollaborationById,
  apiGetAdminCollaborationGroupById,
};
const apiGetAdminCollaborationStatusCountDashboard = async ({
  name,
}: {
  name: "Publish" | "Reject" | "Room";
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  // console.log("Ini Token", token);
  const response = await fetch(`/api/admin/collaboration/dashboard/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("Ini Response", await response.json());
  return await response.json().catch(() => null);
};
const apiGetAdminCollaborationPublish = async ({ page }: { page: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const response = await fetch(
    `/api/admin/collaboration/status/publish/${isPage}`,
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

const apiGetAdminCollaborationReject = async ({ page }: { page: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const response = await fetch(
    `/api/admin/collaboration/status/reject/${isPage}`,
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
const apiGetAdminCollaborationRoomById = async ({
  page,
  search,
}: {
  page: string;
  search: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const isSearch = search ? `&search=${search}` : "";
  const response = await fetch(
    `/api/admin/collaboration/group${isPage}${isSearch}`,
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

const apiGetAdminCollaborationById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/collaboration/${id}`, {
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

const apiGetAdminCollaborationGroupById = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/collaboration/group/${id}`, {
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
        "Failed to get data collaboration group",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get data collaboration group"
      );
    }

    // Return the JSON response

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error get data collaboration group", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
