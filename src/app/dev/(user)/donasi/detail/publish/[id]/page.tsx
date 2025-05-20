import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { DetailPublishDonasi } from "@/app_modules/donasi";
import { Donasi_getCountDonatur } from "@/app_modules/donasi/fun/count/get_count_donatur";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataPublish = await Donasi_getOneById(params.id);
  const countDonatur = await Donasi_getCountDonatur(params.id);
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <DetailPublishDonasi
        dataPublish={dataPublish as any}
        countDonatur={countDonatur}
        userLoginId={userLoginId as string}
      />
    </>
  );
}
