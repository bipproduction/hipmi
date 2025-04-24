import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/**
 * @param index | 0 - 3 | 1: Whatsapp, 2: Bank, 3: Bidang Bisnis
 */
export const gs_app_information_menu = atomWithStorage("gs_app_informations_menu","2");
