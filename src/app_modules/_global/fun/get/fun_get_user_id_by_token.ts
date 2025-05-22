"use server";

import { cookies } from "next/headers";
import { decrypt } from "../../../../app/(auth)/_lib/decrypt";

export async function funGetUserIdByToken() {
  const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY;

  if (!SESSION_KEY) {
    console.warn("SESSION_KEY tidak ditemukan");
    return null;
  }

  const cookieStore = cookies();
  const c = cookieStore.get(SESSION_KEY);

  if (!c?.value) {
    console.warn("Cookie tidak ditemukan");
    return null;
  }

  try {
    const cekUser = await decrypt({
      token: c.value,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
    });

    return cekUser?.id || null;
  } catch (error) {
    console.error("Gagal mendekripsi token:", error);
    return null;
  }
}
