export {
  apiGetMasterAdminBank,
  apiGetMasterAdminBidangBisnis,
};

const apiGetMasterAdminBank = async () => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/master/bank`, {
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
      console.error("Failed to get master admin bank", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get master admin bank");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get master admin bank", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const apiGetMasterAdminBidangBisnis = async () => {
  try {
    // Fetch token from cookie
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await fetch(`/api/admin/master/bidang-bisnis`, {
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
      console.error("Failed to get master admin bidang bisnis", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get master admin bidang bisnis");
    }

    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error get master admin bidang bisnis", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};      
     