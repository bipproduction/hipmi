export {
  apiGetAdminVoteStatusCountDashboard,
  apiGetAdminVoteRiwayatCount,
  apiGetAdminVotingByStatus,
  apiGetAdminVotingRiwayat,
  apiGetOneAdminVotingById as apiGetOneVotingById,
  apiGetAdminKontibutorVotingById,
};
const apiGetAdminVoteStatusCountDashboard = async ({
  name,
}: {
  name: "Publish" | "Review" | "Reject";
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/vote/dashboard/${name}`, {
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

const apiGetAdminVoteRiwayatCount = async () => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const response = await fetch(`/api/admin/vote/dashboard/riwayat`, {
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

const apiGetAdminVotingByStatus = async ({
  name,
  page,
  search,
}: {
  name: "Publish" | "Review" | "Reject";
  page: string;
  search: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
      `/api/admin/vote/status/${name}${isPage}${isSearch}`,
      {
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
        "Error get data voting admin",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.log("Error get data voting admin", error);
    throw error;
  }
};

const apiGetAdminVotingRiwayat = async ({
  page,
  search,
}: {
  page: string;
  search: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
      `/api/admin/vote/status/riwayat${isPage}${isSearch}`,
      {
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
        "Error get data voting admin",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.log("Error get data voting admin", error);
    throw error;
  }
};

const apiGetOneAdminVotingById = async ({ id }: { id: string }) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/vote/${id}`, {
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
        "Error get one data voting admin",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.log("Error get one data voting admin", error);
    throw error;
  }
};

const apiGetAdminKontibutorVotingById = async ({ id }: { id: string }) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/vote/${id}/kontributor`, {
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
        "Error get one data voting admin",
        errorData?.message || "Unknown error"
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.log("Error get one data voting admin", error);
    throw error;
  }
};