export const apiGetPortofolioByProfile = async (path?: string) => {
   const response = await fetch(`/api/new/portofolio${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}