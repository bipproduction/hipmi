import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const gs_token = atomWithStorage<any | null>("gs_token", null);
