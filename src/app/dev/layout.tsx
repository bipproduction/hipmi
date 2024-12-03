import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_getUserById } from "@/app_modules/_global/fun/get/fun_get_user_by_id";
import { redirect } from "next/navigation";
import { RealtimeProvider } from "../lib";
import { ServerEnv } from "../lib/server_env";
import { RouterAdminDashboard } from "../lib/router_hipmi/router_admin";
import { funGlobal_checkActivationUseById } from "@/app_modules/_global/fun/get/fun_check_activation_use_by_id";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();
  // const dataUser = await funGlobal_getUserById({
  //   userId: userLoginId as string,
  // });

  // if (dataUser?.masterUserRoleId != "1") return redirect("/dev/home");

  // const activationUser = await funGlobal_checkActivationUseById({
  //   userId: userLoginId as string,
  // });

  // if (activationUser == false) return redirect("/waiting-room");

  return (
    <>
      <RealtimeProvider
        userLoginId={userLoginId as string}
        WIBU_REALTIME_TOKEN={
          ServerEnv.value?.NEXT_PUBLIC_WIBU_REALTIME_TOKEN as string
        }
      />

      {children}
      {/* <CheckCookies_UiLayout dataUser={dataUser as any}>
        {children}
      </CheckCookies_UiLayout> */}
    </>
  );
}
