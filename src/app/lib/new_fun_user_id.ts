"use server"

import _ from "lodash";
import { cookies } from "next/headers";
import { decrypt } from "../auth/_lib/decrypt";

export async function newFunGetUserId() {
  const c = cookies().get(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);

  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
    return null;
  }

  const token = c.value;
  const dataUser = await decrypt({
    token: token,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  });

  return dataUser?.id;
}