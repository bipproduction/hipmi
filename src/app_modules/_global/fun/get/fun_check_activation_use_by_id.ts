"use server";

import { prisma } from "@/lib";
import { RouterAuth } from "@/lib/router_hipmi/router_auth";
import { permanentRedirect } from "next/navigation";

export async function funGlobal_checkActivationUseById({
  userId,
}: {
  userId: string;
}) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      active: true,
    },
  });

  return data?.active;
}
