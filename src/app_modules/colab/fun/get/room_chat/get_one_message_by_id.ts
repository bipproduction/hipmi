"use server";

import prisma from "@/lib/prisma";

export default async function colab_getOneMessageById({
  messageId,
}: {
  messageId: string;
}) {
//   console.log(messageId);
  const getOne = await prisma.projectCollaboration_Message.findFirst({
    where: {
      id: messageId,
    },
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      message: true,
      isFile: true,
      User: {
        select: {
          id: true,
          Profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return getOne;
}
