export {
  apiGetAllForum,
  apiGetOneForumById,
  apiGetForumkuByUserId as apiGetForumkuById,
  apiGetKomentarForumById,
  apiGetMasterReportForum,
  apiGetOneReportedPostingById,
  apiGetOneReportKomentarById,
};

const apiGetAllForum = async ({
  page,
  search,
}: {
  page: string;
  search?: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/forum?page=${page}${isSearch}`, {
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
      console.error("Failed to get all forum", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get all forum");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get all forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetOneForumById = async ({ id }: { id: string }) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/forum/${id}`, {
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
      console.error("Failed to get all forum:", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get all forum");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get all forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetForumkuByUserId = async ({
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

    const isPage = `?page=${page}`;
    const response = await fetch(`/api/forum/forumku/${id}${isPage}`, {
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
      console.error("Failed to get all forum:", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get all forum");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get all forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetKomentarForumById = async ({ id , page}: { id: string , page: string}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const nextPage = `?page=${page}`;
    const response = await fetch(`/api/forum/${id}/komentar${nextPage}`, {
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
      console.error("Failed to get all forum:", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get all forum");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get all forum", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


const apiGetMasterReportForum = async () => {
    try {
      // Fetch token from cookie
      const { token } = await fetch("/api/get-cookie").then((res) =>
        res.json()
      );
      if (!token) {
        console.error("No token found");
        return null;
      }

      const response = await fetch(`/api/forum/master`, {
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
          "Failed to get all forum:",
          response.statusText,
          errorData
        );
        throw new Error(errorData?.message || "Failed to get all forum");
      }

      // Return the JSON response
      return await response.json();
    } catch (error) {
      console.error("Error get all forum", error);
      throw error; // Re-throw the error to handle it in the calling function
    }

}

const apiGetOneReportedPostingById = async ({ id }: { id: string }) => {
    try {
      // Fetch token from cookie
      const { token } = await fetch("/api/get-cookie").then((res) =>
        res.json()
      );
      if (!token) {
        console.error("No token found");
        return null;
      }

      const response = await fetch(`/api/forum/${id}/report-posting`, {
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
          "Failed to get all forum:",
          response.statusText,
          errorData
        );
        throw new Error(errorData?.message || "Failed to get all forum");
      }

      // Return the JSON response
      return await response.json();
    } catch (error) {
      console.error("Error get all forum", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const apiGetOneReportKomentarById = async ({ id }: { id: string }) => {
    try {
      // Fetch token from cookie
      const { token } = await fetch("/api/get-cookie").then((res) =>
        res.json()
      );
      if (!token) {
        console.error("No token found");
        return null;
      }

      const response = await fetch(`/api/forum/${id}/report-komentar`, {
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
          "Failed to get all forum:",
          response.statusText,
          errorData
        );
        throw new Error(errorData?.message || "Failed to get all forum");
      }

      // Return the JSON response
      return await response.json();
    } catch (error) {
      console.error("Error get all forum", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };