"use server";

import { prisma } from "@/lib";

export async function voting_checkStatus({
  id,
}: {
  id: string;
}) {
  const checkStatus = await prisma.voting.findFirst({
    where: {
      id: id,
    },
  });

  if(checkStatus?.voting_StatusId == "2") return true
  return false

//   if (checkStatus?.voting_StatusId == "2") return true;
//   return false;
}
