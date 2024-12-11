import { HomeViewNew } from "@/app_modules/home";
import notifikasi_countUserNotifikasi from "@/app_modules/notifikasi/fun/count/fun_count_by_id";

export default async function PageHome() {
  // const userLoginId = await funGetUserIdByToken();
  // const dataUser = await user_getOneByUserId(userLoginId as string);
  // const dataJob = await job_getTwoForHomeView();
  const countNotifikasi = await notifikasi_countUserNotifikasi();


  return (
    <>
      {/* <HomeView
        dataUser={dataUser as any}
        dataJob={dataJob as any}
        countNotifikasi={countNotifikasi}
      /> */}
      <HomeViewNew countNotifikasi={countNotifikasi} />
    </>
  );
}
