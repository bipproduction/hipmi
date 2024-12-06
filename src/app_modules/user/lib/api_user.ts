export const apiGetUserProfile = async (path?: string) => {
   const response = await fetch(`/api/new/user${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}