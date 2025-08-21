"use server";

import prisma from "@/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function colab_funCekPartisipasiById(colabId: string) {
  const userLoginId = await funGetUserIdByToken();

  const cek = await prisma.projectCollaboration_Partisipasi.findFirst({
    where: {
      projectCollaborationId: colabId,
      userId: userLoginId,
    },
  });

  if (cek === null) {
    return false;
  } else {
    return true;
  }
}
