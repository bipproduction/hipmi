export {
    apiGetDonasiStatusCountDashboard,
    apiGetDonasiKategoriCountDashboard
};
const apiGetDonasiStatusCountDashboard = async ({ name }:
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

const apiGetDonasiKategoriCountDashboard = async () => {
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