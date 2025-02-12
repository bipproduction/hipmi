"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function profile_funUpdatePhoto({
  profileId,
  fileId,
}: {
  profileId: string;
  fileId: string;
}) {
  const updateProfile = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      imageId: fileId,
    },
  });

  if (!updateProfile) return { status: 400, message: "Gagal update foto" };
  revalidatePath("/dev/katalog");

  return {
    status: 200,
    message: "Update berhasil",
  };
}
