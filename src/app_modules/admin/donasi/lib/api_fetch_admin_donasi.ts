export {
    apiGetAdminDonasiStatusCountDashboard,
    apiGetAdminDonasiKategoriCountDashboard,
    apiGetAdminDonasiByStatus,
    apiGetAdminDonasiKategori,
    apiGetAdminDonasiById,
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
    name,
    page,
    search }: {
        name: "Publish" | "Review" | "Reject",
        page: string;
        search: string;
    }) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

   
    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(
        `/api/admin/donasi/status/${name}${isPage}${isSearch}`,
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
const apiGetAdminDonasiKategori = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    
    const response = await fetch(`/api/admin/donasi/kategori`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`
            
        }
    })
    return await response.json().catch(() => null);
}
const apiGetAdminDonasiById = async ({id} : {id: string}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/donasi/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json().catch(() => null);    
}