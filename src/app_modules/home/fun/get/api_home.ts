export const apiGetDataHome = async (path?: string) => {
   const response = await fetch(`/api/new/home${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}