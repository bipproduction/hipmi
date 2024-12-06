import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { redirect } from "next/navigation";

export default async function Page() {
  // const userLoginId = await funGetUserIdByToken();
  // const dataUser = await funGlobal_getUserById({ userId: userLoginId });

  // if (dataUser?.masterUserRoleId === "1") {
  //   return redirect(RouterHome.main_home);
  // }

  // if (dataUser?.masterUserRoleId !== "1") {
  //   return redirect(RouterAdminDashboard.splash_admin);
  // }

  // return <CheckCookies_UiView />;
}
