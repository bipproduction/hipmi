"use server";

import { prisma } from "@/app/lib";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
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
