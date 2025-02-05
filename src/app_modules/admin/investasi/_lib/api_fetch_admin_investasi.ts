export {
    apiGetAdminInvestasiCountDashboard,
    apiGetAdminInvestasiByStatus,
}
const apiGetAdminInvestasiCountDashboard = async ({ name }:
    { name: "Publish" | "Review" | "Reject" }) => {
    

    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);
   

    const response = await fetch(`/api/admin/investasi/dashboard/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        },
    })

    return await response.json().catch(() => null);
};

const apiGetAdminInvestasiByStatus = async ({ status, page, search }: {
    status: "Publish" | "Review" | "Reject",
    page: string,
    search: string
}) => {
    console.log("dgsdg")
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);
    console.log("Ini token", token)
    console.log("Ini Page", page)
    console.log("Ini Search", search)
    

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/admin/investasi/${status}${isPage}${isSearch}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        },
    })
    console.log("Ini response", response)
    return await response.json().catch(() => null);
}