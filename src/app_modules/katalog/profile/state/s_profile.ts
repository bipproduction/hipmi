import { atomWithStorage } from "jotai/utils";
import { ModelProfile } from "../model/interface";

/**
 * @returns data user by id
 */
export const gs_User = atomWithStorage<any | null>("value_User", null);

/**
 * @returns data user by profile
 */
export const gs_Profile = atomWithStorage<any | null>("valProfile", null);

// export const gs_fotoProfile = atomWithStorage<any | null>(
//   "value_fotoProfile",
//   null
// );
