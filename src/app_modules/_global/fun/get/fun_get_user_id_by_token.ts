"use server";

import { prisma } from "@/app/lib";
import { ServerEnv } from "@/app/lib/server_env";
import { unsealData } from "iron-session";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function funGetUserIdByToken() {
  const SESSION_KEY = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
  // console.log("SESSION_KEY", SESSION_KEY);
  const c = cookies().get("hipmi-key");

  const cekUser = await decrypt({
    token: c?.value as string,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  });

  // console.log("userid" , cekUser?.id)

  //  const token = JSON.parse(
  //    await unsealData(c?.value as string, {
  //      password: process.env.WIBU_PWD as string,
  //    })
  //  );
  //  return token.id;

  // const token = c?.value;
  // const cekToken = await prisma.userSession.findFirst({
  //   where: {
  //     token: token,
  //   },
  // });

  // if (cekToken === null) return null
  return cekUser?.id;
}

async function decrypt({
  token,
  encodedKey,
}: {
  token: string;
  encodedKey: string;
}): Promise<Record<string, any> | null> {
  try {
    const enc = new TextEncoder().encode(encodedKey);
    const { payload } = await jwtVerify(token, enc, {
      algorithms: ["HS256"],
    });
    return (payload.user as Record<string, any>) || null;
  } catch (error) {
    console.error("Gagal verifikasi session", error);
    return null;
  }
}
