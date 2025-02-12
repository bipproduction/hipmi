export {
    apiGetAdminForumPublishCountDasboard,
    apiGetAdminCountForumReportPosting ,
    apiGetAdminCountForumReportKomentar,
    apiGetAdminForumReportPosting,
    apiGetAdminForumReportKomentar,
    apiGetAdminForumPublish
}

const apiGetAdminForumPublishCountDasboard = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/forum/dashboard/publish`, {
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

const apiGetAdminCountForumReportPosting = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/forum/dashboard/report_posting`, {
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

const apiGetAdminCountForumReportKomentar = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/forum/dashboard/report_komentar`, {
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
const apiGetAdminForumReportPosting = async ({page} : { page?: string}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(`/api/admin/forum/posting${isPage}`, {
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
const apiGetAdminForumReportKomentar = async({ page } : { page?: string}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);
    
    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(`/api/admin/forum/komentar${isPage}`, {
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
const  apiGetAdminForumPublish = async ({ page }: { page?: string }) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const isPage = page ? `?page=${page}` : "";
    const response = await fetch(`/api/admin/forum/publish${isPage}`, {
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

const apiGetAdminHasilReportPosting = async ({id} : {id: string}) => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    

}