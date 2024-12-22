export const apiGetAllDonasi = async (path?: string) => {
   const response = await fetch(`/api/new/donasi${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetMasterDonasi = async (path?: string) => {
   const response = await fetch(`/api/new/donasi/master${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetAllDonasiSaya = async (path?: string) => {
   const response = await fetch(`/api/new/donasi/invoice${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetOneDonasiById = async (path: string) => {
   const response = await fetch(`/api/new/donasi/${path}`)
   return await response.json().catch(() => null)
}