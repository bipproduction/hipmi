import { AdminMain } from "@/app_modules/admin/main_dashboard";
import { AdminMainDashboard_CountPOrtofolio } from "@/app_modules/admin/main_dashboard/fun/count/fun_count_portofolio";
import { AdminMainDashboard_CountUser } from "@/app_modules/admin/main_dashboard/fun/count/fun_count_user";

export default async function Page() {
  // const countUser = await AdminMainDashboard_CountUser();
  // const countPorto = await AdminMainDashboard_CountPOrtofolio();

  // await new Promise((a, b) => {
  //   setTimeout(a, 4000);
  // });

  return <AdminMain/>;
}
