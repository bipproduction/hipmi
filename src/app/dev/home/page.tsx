import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { HomeView } from "@/app_modules/home";
import { user_getOneByUserId } from "@/app_modules/home/fun/get/get_one_user_by_id";
import { job_getTwoForHomeView } from "@/app_modules/job/fun/get/get_two_for_home_view";
import notifikasi_countUserNotifikasi from "@/app_modules/notifikasi/fun/count/fun_count_by_id";
import { redirect } from "next/navigation";

export default async function PageHome() {
  const userLoginId = await funGetUserIdByToken();
  const dataUser = await user_getOneByUserId(userLoginId as string);
  const dataJob = await job_getTwoForHomeView();
  const countNotifikasi = await notifikasi_countUserNotifikasi();

  // console.log(userLoginId, "ini di home");
  // console.log(dataUser, "ini di home");

  // if (dataUser?.active === false) {
  //   return redirect(RouterHome.home_user_non_active);
  // }
  // if (dataUser?.masterUserRoleId === "2" || dataUser?.masterUserRoleId === "3")
  //   return redirect(RouterAdminDashboard.main_admin);

  return (
    <>
      <HomeView
        dataUser={dataUser as any}
        dataJob={dataJob as any}
        countNotifikasi={countNotifikasi}
      />
    </>
  );
}
