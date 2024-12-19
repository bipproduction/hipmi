export const apiGetMasterInvestasi = async (path?: string) => {
   const response = await fetch(`/api/new/investasi/master${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetOneInvestasiById = async (path: string) => {
   const response = await fetch(`/api/new/investasi/${path}`)
   return await response.json().catch(() => null)
}

export const apiGetAllInvestasi = async (path?: string) => {
   const response = await fetch(`/api/new/investasi${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}

export const apiGetAllSahamSaya = async (path?: string) => {
   const response = await fetch(`/api/new/investasi/invoice${(path) ? path : ''}`)
   return await response.json().catch(() => null)
}