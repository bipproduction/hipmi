"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function forum_funEditPostingById(
  postingId: string,
  diskusi: string
) {
  try {
    const updt = await prisma.forum_Posting.update({
      where: {
        id: postingId,
      },
      data: {
        diskusi: diskusi,
      },
    });

    if (!updt) {
      return { success: false, message: "Update gagal", status: 400 }; // Plain object dengan status
    }
    revalidatePath("/dev/forum/main");
    return { success: true, message: "Berhasil update", status: 200 }; // Plain object dengan status
  } catch (error) {
    return { success: false, message: "Update error", status: 500 }; // Plain object dengan status
  }
}
