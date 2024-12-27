"use server";

import { jwtVerify } from "jose";
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

// async function decrypt({
//   token,
//   encodedKey,
// }: {
//   token: string;
//   encodedKey: string;
// }): Promise<Record<string, any> | null> {
//   try {
//     const enc = new TextEncoder().encode(encodedKey);
//     const { payload } = await jwtVerify(token, enc, {
//       algorithms: ["HS256"],
//     });
//     return (payload.user as Record<string, any>) || null;
//   } catch (error) {
//     console.error("Gagal verifikasi session", error);
//     return null;
//   }
// }
