"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function forum_funDeletePostingById(forumId: string) {
  try {
    const del = await prisma.forum_Posting.update({
      where: {
        id: forumId,
      },
      data: {
        isActive: false,
      },
    });

    if (!del) return { status: 400, message: "Gagal dihapus" };
    revalidatePath("/dev/forum/main");
    return { status: 200, message: "Berhasil dihapus" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error API",
      error: (error as Error).message,
    };
  }
}
