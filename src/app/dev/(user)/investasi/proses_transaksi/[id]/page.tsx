import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import { ProsesTransaksiInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const userLoginId = await funGetUserIdByToken();

  const userLogin = await funGetUserProfile(userLoginId as string);
  const dataInvestasi = await getOneInvestasiById(params.id);

  // console.log(dataInvestasi);
  return (
    <>
      <ProsesTransaksiInvestasi
        dataInvestasi={dataInvestasi as any}
        userLogin={userLogin as any}
      />
    </>
  );
}
