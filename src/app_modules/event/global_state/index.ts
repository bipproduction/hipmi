import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/**
 * @param index | 0 - 3 | 0: Beranda, 1: Status, 2: Kontibusi, 3: Riwayat
 * @type number
 */
export const gs_event_hotMenu = atomWithStorage("gs_event_hotMenu", 0);

/**
 * @param status | "Publish", "Review", "Draft", "Reject"
 * @type string
 */
export const gs_event_status = atomWithStorage<string | any>(
  "gs_status_event",
  "Publish"
);

export const gs_nominal_sponsor = atomWithStorage<number>(
  "gs_nominal_sponsor",
  0
);

export const gs_event_bank_id = atomWithStorage<string>("gs_event_bank_id", "");
