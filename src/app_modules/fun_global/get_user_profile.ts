"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function funGetUserProfile( userId: string ) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
      select: {
        id: true,
        username: true,
        nomor: true,
        Profile: {
          select: {
            id: true,
            alamat: true,
            email: true,
            jenisKelamin: true,
            name: true,
            imageId: true,
            imageBackgroundId: true,
          },
        },
      },
  });

  revalidatePath("/dev/home");
  revalidatePath("/dev/katalog/view");

  return user;
}
