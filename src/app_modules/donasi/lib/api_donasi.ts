export const apiGetAllDonasi = async (path?: string) => {
   const response = await fetch(`/api/new/donasi${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}