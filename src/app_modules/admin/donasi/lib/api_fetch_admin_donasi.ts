export {
    apiGetAdminDonasiStatusCountDashboard,
    apiGetAdminDonasiKategoriCountDashboard,
    apiGetAdminDonasiByStatus
};
const apiGetAdminDonasiStatusCountDashboard = async ({ name }:
    { name: "Publish" | "Review" | "Reject" }) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/donasi/dashboard/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
    });
    return await response.json().catch(() => null);
};

const apiGetAdminDonasiKategoriCountDashboard = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/donasi/dashboard/kategori`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control_Allow-Origin": "*",
            Authorization: `Bearer ${token}`
        }
    });
    return await response.json().catch(() => null);
}

const apiGetAdminDonasiByStatus = async ({
    status,
    page,
    search }: {
        status: "Publish" | "Review" | "Reject",
        page: string;
        search: string;
    }) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    console.log("Ini token", token)
    console.log("Ini Page", page)
    console.log("Ini search", search)
    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
        `/api/admin/donasi/${status}${isPage}${isSearch}`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`
            }
        }
    )
    console.log("Ini response", response)
    return await response.json().catch(() => null);
}
