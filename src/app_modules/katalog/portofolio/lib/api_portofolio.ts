export const apiGetPortofolioByProfile = async (path?: string) => {
   const response = await fetch(`/api/new/portofolio${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetOnePortofolioById = async (path: string, cat:string) => {
   const response = await fetch(`/api/new/portofolio/${path}?cat=${cat}`);
   return await response.json().catch(() => null);
}

export const apiDeletePortofolio = async (path: string) => {
   const response = await fetch(`/api/new/portofolio/${path}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
   });
   return await response.json().catch(() => null);
}