"use server";

import _ from "lodash";
import { cookies } from "next/headers";
import { decrypt } from "../auth/_lib/decrypt";
import backendLogger from "@/util/backendLogger";

export async function newFunGetUserId() {
  try {
    const key = process.env.NEXT_PUBLIC_BASE_SESSION_KEY;
    const c = cookies().get("hipmi-key");

    if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
      return null;
    }

    const token = c.value;
    const dataUser = await decrypt({
      token: token,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    });

    return dataUser?.id;
  } catch (error) {
    backendLogger.log("Gagal mendapatkan user id", error);
    return null;
  }
}
