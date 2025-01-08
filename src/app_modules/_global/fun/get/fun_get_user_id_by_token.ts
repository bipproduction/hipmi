"use server";

import { cookies } from "next/headers";
import { decrypt } from "../../../../app/auth/_lib/decrypt";

export async function funGetUserIdByToken() {
  const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
  const c = cookies().get(SESSION_KEY);

  const cekUser = await decrypt({
    token: c?.value as string,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  });

  return cekUser?.id;
}

