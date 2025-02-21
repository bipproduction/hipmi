export {
    apiGetAdminVoteStatusCountDashboard,
    apiGetAdminVoteRiwayatCount,
    apiGetAdminVotingByStatus
}
const apiGetAdminVoteStatusCountDashboard = async ({ name }: {
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
        }
    });
    return await response.json().catch(() => null);
}
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
        }
    });
    return await response.json().catch(() => null);
}

const apiGetAdminVotingByStatus = async ({ 
    name, 
    page,
    search }: {
        name: "Publish" | "Review" | "Reject";
        page: string;
        search: string;
    }) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
        `/api/admin/vote/status/${name}${isPage}${isSearch}`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`
            }
        }
    )
    return await response.json().catch(() => null);
}