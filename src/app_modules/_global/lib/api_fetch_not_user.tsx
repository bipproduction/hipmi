export async function apiGetNotUserForJob({ id }: { id: string }) {
  try {
    const response = await fetch(`/api/not-user/job/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Failed to get job", response.statusText, errorData);
      throw new Error(errorData?.message || "Failed to get job");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get job:", error);
    throw error;
  }
}
