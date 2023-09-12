"use server";

import prisma from "@/app/lib/prisma";

/**
 * 
 * @param id 
 * @function get data profile dan user
 * @returns data profile dan user
 */
export async function getDataProfile(id: string) {
  const dataUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      nomor: true,
      active: true,
      masterUserRoleId: true,
    },
  });

  const dataProfile = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      alamat: true,
      jenisKelamin: true,
      active: true,
      Images: true,
    },
  });

  return {
    dataUser,
    dataProfile,
  };
}
