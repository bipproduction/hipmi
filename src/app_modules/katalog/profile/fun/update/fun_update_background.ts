"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function profile_funUpdateBackground({
  profileId,
  fileId,
}: {
  profileId: string;
  fileId: string;
}) {
  const updateBackground = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      imageBackgroundId: fileId,
    },
  });

  if (!updateBackground)
    return { status: 400, message: "Gagal update gambar background" };
  revalidatePath("/dev/katalog");

  return {
    status: 200,
    message: "Update berhasil",
  };
}
