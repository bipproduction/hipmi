import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();
  const dataUser = await funGlobal_getUserById({
    userId: userLoginId as string,
  });

  if (dataUser?.masterUserRoleId != "1")
    return redirect(RouterAdminDashboard.splash_admin);

  return <>{children}</>;
}
