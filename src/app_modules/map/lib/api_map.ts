export const apiGetAllMap = async (path?: string) => {
   const response = await fetch(`/api/new/map${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetOneMapById = async (path: string) => {
   const response = await fetch(`/api/new/map/${path}`);
   return await response.json().catch(() => null);
}
