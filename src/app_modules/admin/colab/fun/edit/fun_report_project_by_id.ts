"use server";

import prisma from "@/lib/prisma";
import { RouterAdminColab } from "@/lib/router_admin/router_admin_colab";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export default async function adminColab_funReportProjectById({
  colabId,
  report,
}: {
  colabId: string;
  report: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const projectUpdate = await prisma.projectCollaboration.update({
    where: {
      id: colabId,
    },
    data: {
      isActive: false,
      isReject: true,
      report: report,
    },
    select: {
      userId: true,
    },
  });

  if (!projectUpdate) return { status: 400, message: "Gagal update project" };

  // const updateReport = await prisma.projectCollaboration_Notifikasi.create({
  //   data: {
  //     projectCollaborationId: colabId,
  //     adminId: userLoginId as string,
  //     userId: projectUpdate.userId as any,
  //     note: "Project Anda Telah Direport Admin",
  //   },
  // });

  // if (!updateReport) return { status: 400, message: "Gagal update notifikasi" };

  revalidatePath(RouterAdminColab.table_publish);
  return { status: 200, message: "Berhasil Update" };
}
