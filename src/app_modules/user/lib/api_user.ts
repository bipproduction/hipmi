export const apiGetUserProfile = async (path?: string) => {
   const { token } = await fetch("/api/get-cookie").then((res) => res.json());
   if(!token) return null

   const response = await fetch(`/api/new/user${(path) ? path : ''}`, {
    headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Authorization': `Bearer ${token}`,
      }
   })

   // console.log(await response.json())

   if (!response.ok) return null
   const data: Record<string, any> = await response.json()
   return data
}