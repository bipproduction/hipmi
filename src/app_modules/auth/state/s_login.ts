import { atomWithStorage } from 'jotai/utils';

export const gs_Otp = atomWithStorage("valueOtp", "")
export const gs_Nomor = atomWithStorage("valueNomor","")
export const valueStatus = atomWithStorage("value_status",false)