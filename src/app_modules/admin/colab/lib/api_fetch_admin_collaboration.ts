export {
    apiGetAdminCollaborationStatusCountDashboard,
    apiGetAdminCollaborationStatusById,
    apiGetAdminCollaborationRoomById
   
}
const apiGetAdminCollaborationStatusCountDashboard = async ({
    name
}: {
        name: "Publish" | "Reject" | "Room";
}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    // console.log("Ini Token", token);
    const response = await fetch(`/api/admin/collaboration/dashboard/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
    })
    // console.log("Ini Response", await response.json());
    return await response.json().catch(() => null);
}
const apiGetAdminCollaborationStatusById = async ({ status, page}: {
    status: "Publish" | "Reject",
    page: string,
    
}) => {
    
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);
    
    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(`/api/admin/collaboration/${status}${isPage}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
    })

    return await response.json().catch(() => null);
}
const apiGetAdminCollaborationRoomById = async ({ page, search }: {
    page: string,
    search: string
}) => {
    
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);
    
    const isPage = page ? `?page=${page}` : "";
    const isSearch = search ? `&search=${search}` : "";
    const response = await fetch(`/api/admin/collaboration/group${isPage}${isSearch}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
    })

    return await response.json().catch(() => null);
}

