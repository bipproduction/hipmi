"use server";

import prisma from "@/lib/prisma";
import { RouterAdminDeveloper } from "@/lib/router_admin/router_admin_developer";
import { revalidatePath } from "next/cache";

export default async function adminDeveloper_funEditUserAksesById(
  userId: string,
  roleId: string
) {
  const updt = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      masterUserRoleId: roleId,
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update Akses" };
  revalidatePath(RouterAdminDeveloper.main);
  return { status: 200, message: "Berhasil Update Akses" };
}
