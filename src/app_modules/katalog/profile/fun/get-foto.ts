"use server";
import prisma from "@/app/lib/prisma";
import { MyConsole } from "@/app_modules/fun";

export default async function getFotoProfile(id: string) {
  if (!id) {
    return MyConsole("Gambar tidak ditemukan");
  } else {
    const data = await prisma.images.findUnique({
      where: {
        id: id,
      },
      select: {
        url: true,
      },
    });
    return data;
  }
}
