export {
    apiGetAdminJobStatusCountDashboard as apiGetJobStatusCountDashboard ,
    apiGetAdminJobArsipCount as apiGetJobArsipCount,
    apiGetAdminJobByStatus
}

const apiGetAdminJobStatusCountDashboard = async ({ name }: {
    name: "Publish" | "Review" | "Reject";
}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/job/dashboard/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json().catch(() => null)
}

const apiGetAdminJobArsipCount = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/job/dashboard/arsip`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
    });
    return await response.json().catch(() => null)

};
const apiGetAdminJobByStatus = async ({
    name,
    page,
    search
}: {
    name: "Publish" | "Review" | "Reject";
    page: string;
    search: string;
}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
        `/api/admin/job/status/${name}${isPage}${isSearch}`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`
            }
        }
    )
    return await response.json().catch(() => null)
}