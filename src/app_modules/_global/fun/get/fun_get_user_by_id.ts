"use server";

import { prisma } from "@/lib";
import { RouterAuth } from "@/lib/router_hipmi/router_auth";
import { permanentRedirect } from "next/navigation";

export async function funGlobal_getUserById({ userId }: { userId: string }) {
  // if (!userId) return permanentRedirect(RouterAuth.login);
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      Profile: true,
    },
  });

  return data;
}
