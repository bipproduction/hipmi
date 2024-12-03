import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { Admin_NewLayout } from "@/app_modules/admin";
import adminNotifikasi_countNotifikasi from "@/app_modules/admin/notifikasi/fun/count/count_is_read";
import adminNotifikasi_getByUserId from "@/app_modules/admin/notifikasi/fun/get/get_notifikasi_by_user_id";
import React from "react";
import versionUpdate from "../../../../package.json";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();
  const version = versionUpdate.version;

  const dataUser = await funGlobal_getUserById({
    userId: userLoginId as string,
  });
  const listNotifikasi = await adminNotifikasi_getByUserId({ page: 1 });
  const countNotifikasi = await adminNotifikasi_countNotifikasi();

  if (dataUser?.masterUserRoleId == "1") return redirect("/dev/home");

  return (
    <>
      <Admin_NewLayout
        user={dataUser as any}
        countNotifikasi={countNotifikasi as any}
        listNotifikasi={listNotifikasi as []}
        version={version}
      >
        {children}
      </Admin_NewLayout>
    </>
  );
}
