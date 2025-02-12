"use server";

import prisma from "@/lib/prisma";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export default async function colab_funCreateMessageByUserId(
  message: string,
  roomId: string
) {
  const userLoginId = await funGetUserIdByToken();

  const msg = await prisma.projectCollaboration_Message.create({
    data: {
      userId: userLoginId,
      message: message,
      projectCollaboration_RoomChatId: roomId,
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

  if (!msg) return { status: 400, message: "Pesan Gagal Dikirim" };
  revalidatePath(RouterColab.group_chat + roomId);

  return { data: msg, status: 200, message: "Pesan Berhasil Dikirim" };
}
