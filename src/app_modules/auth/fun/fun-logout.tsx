"use server";

import { cookies } from "next/headers";

/**
 * 
 * @returns cookies dan set value = ""
 */
export async function deleteCookies() {
  const c = cookies().set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/dev/auth/login",
  });
  return c
}
