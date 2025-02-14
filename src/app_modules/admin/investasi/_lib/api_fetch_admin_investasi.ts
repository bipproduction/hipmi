export {
    apiGetAdminInvestasiCountDashboard,
    apiGetAdminInvestasiByStatus,
    apiGetAdminInvestasiById,
    
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
    
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);
    
    

    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/admin/investasi/status/${status}${isPage}${isSearch}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        },
    })
    
    return await response.json().catch(() => null);
}

const apiGetAdminInvestasiById = async ({id} : {id: string}) => {
    const { token } = await fetch ("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    
    const response = await fetch(`/api/admin/investasi/${id}/detail`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
    })

    return await response.json().catch(() => null);
}