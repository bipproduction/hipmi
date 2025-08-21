export const apiGetCountUserActive = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/main_dashboard/user`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json().catch(() => null);
}
export const apiGetCountPortofolio = async () => {
    const { token } = await fetch("/api/get-cookie").then((res) => res.json());
    if (!token) return await token.json().catch(() => null);

    const response = await fetch(`/api/admin/main_dashboard/portofolio`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json().catch(() => null);
}