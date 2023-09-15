"use server";
import prisma from "@/app/lib/prisma";
import { MyConsole } from "@/app_modules/fun";

export async function getFotoProfile(id: any) {
  const imgUrl = await prisma.images.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      url: true,
    },
  });

  return imgUrl;
}
