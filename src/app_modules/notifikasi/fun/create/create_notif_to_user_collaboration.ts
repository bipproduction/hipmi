"use server";

import prisma from "@/lib/prisma";

export async function notifikasiToUser_CreateGroupCollaboration({
  colabId,
}: {
  colabId: string;
}) {
  const userPartisipasi =
    await prisma.projectCollaboration_Partisipasi.findMany({
      where: {
        ProjectCollaboration: {
          id: colabId,
        },
      },
      select: {
        // User: true,
        userId: true,
        // ProjectCollaboration: {
        //     select: {
        //         id
        //         title: true
        //     }
        // },
      },
    });

   

  console.log(userPartisipasi);
}
