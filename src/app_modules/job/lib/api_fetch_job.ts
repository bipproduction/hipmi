export {
  apiGetJob,
  apiGetJobArsip,
  apiGetJobById,
  apiGetJobByStatus,
  apiCreatedJob,
};

const apiGetJobByStatus = async ({
  status,
  page,
}: {
  status?: string;
  page: string;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const isPage = `?page=${page}`;
    const response = await fetch(`/api/job/status/${status}${isPage}`, {
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
        "Error respone data job:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error get data job:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetJob = async ({
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

    // Send PUT request to update portfolio logo
    const isPage = `?page=${page}`;
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/job${isPage}${isSearch}`, {
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
        "Error respone data job:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error get data job:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetJobArsip = async ({ page }: { page: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const isPage = `?page=${page}`;
    const response = await fetch(`/api/job/arsip${isPage}`, {
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
        "Error respone data arsip job:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error get data arsip job:", (error as Error).message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetJobById = async ({ id }: { id: string }) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const response = await fetch(`/api/job/${id}`, {
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
        "Error get data job:",
        errorData?.message || "Unknown error"
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error get data job:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


const apiCreatedJob = async ({ data }: { data: any }) => {
  try {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/job`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed created job", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed created job");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error created job", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
