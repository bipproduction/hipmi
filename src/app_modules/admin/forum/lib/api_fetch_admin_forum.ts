export {
  apiGetAdminForumPublishCountDasboard,
  apiGetAdminCountForumReportPosting,
  apiGetAdminCountForumReportKomentar,
  apiGetAdminForumReportPosting,
  apiGetAdminForumReportKomentar,
  apiGetAdminForumPublish,
  apiGetAdminHasilReportPosting,
  apiAdminGetKomentarForumById,
  apiAdminGetPostingForumById,
};

const apiGetAdminForumPublishCountDasboard = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/forum/dashboard/publish`, {
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

const apiGetAdminCountForumReportPosting = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/forum/dashboard/report_posting`, {
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

const apiGetAdminCountForumReportKomentar = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/forum/dashboard/report_komentar`, {
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
const apiGetAdminForumReportPosting = async ({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const isSeach = search ? `&search=${search}` : "";
  const response = await fetch(`/api/admin/forum/posting${isPage}${isSeach}`, {
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
const apiGetAdminForumReportKomentar = async ({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const isSeach = search ? `&search=${search}` : "";
  const response = await fetch(`/api/admin/forum/komentar${isPage}${isSeach}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json().catch(() => null);
};
const apiGetAdminForumPublish = async ({
  page,
  search,
}: {
  page?: string;
  search?: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const isSearch = search ? `&search=${search}` : "";
  const response = await fetch(
    `/api/admin/forum/publish/${isPage}${isSearch}`,
    {
      method: "GET",
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

const apiGetAdminHasilReportPosting = async ({
  page,
  id,
}: {
  page?: string;
  id: string;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const isPage = page ? `?page=${page}` : "";
  const response = await fetch(
    `/api/admin/forum/${id}/report_posting${isPage}`,
    {
      method: "GET",
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

const apiAdminGetKomentarForumById = async ({
  id,
  page,
  search,
}: {
  id: string;
  page?: string;
  search?: string;
}) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
      `/api/admin/forum/${id}/komentar${isPage}${isSearch}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        "Failed to get admin komentar forum",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get admin komentar forum"
      );
    }

    // Return the JSON response
    const resulst = await response.json();
    return resulst;
  } catch (error) {
    console.error("Error get admin komentar forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiAdminGetPostingForumById = async ({
  id,
}: {
  id: string;
}) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/forum/${id}`, {
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
        "Failed to get admin posting forum",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to get admin posting forum"
      );
    }

    // Return the JSON response
    const resulst = await response.json();
    return resulst;
  } catch (error) {
    console.error("Error get admin posting forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
