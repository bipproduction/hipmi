export {
  apiCreatePortofolio,
  apiGetPortofolioById,
  apiUpdatePortofolioById,
  apiUpdateLogoPortofolioById,
  apiUpdateMedsosPortofolioById,
};

const apiCreatePortofolio = async ({
  profileId,
  data,
}: {
  profileId: string;
  data: any;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const res = await fetch(`/api/portofolio/${profileId}`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json().catch(() => null);
};

const apiGetPortofolioById = async ({ id }: { id: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const res = await fetch(`/api/portofolio/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json().catch(() => null);
};

const apiUpdatePortofolioById = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());
  if (!token) return await token.json().catch(() => null);

  const respone = await fetch(`/api/portofolio/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!respone.ok) {
    console.error("Failed to send logs:", respone.statusText);
    return null;
  }

  return await respone.json();
};

const apiUpdateLogoPortofolioById = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const response = await fetch(`/api/portofolio/logo/${id}`, {
      method: "PUT",
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
      console.error(
        "Failed to update portfolio logo:",
        response.statusText,
        errorData
      );
      throw new Error(errorData?.message || "Failed to update portfolio logo");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error updating portfolio logo:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiUpdateMedsosPortofolioById = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    // Send PUT request to update portfolio logo
    const response = await fetch(`/api/portofolio/medsos/${id}`, {
      method: "PUT",
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
      console.error(
        "Failed to update portfolio medsos:",
        response.statusText,
        errorData
      );
      throw new Error(
        errorData?.message || "Failed to update portfolio medsos"
      );
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error updating portfolio medsos:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
