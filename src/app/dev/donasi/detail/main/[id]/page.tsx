import DetailMainDonasiNew from "@/app_modules/donasi/detail/detail_main/index_new";

export default async function Page({ params }: { params: { id: string } }) {
  // let donasiId = params.id;
  // const userLoginId = await funGetUserIdByToken();

  // const dataDonasi = await Donasi_getOneById(donasiId);
  // const countDonatur = await Donasi_getCountDonatur(donasiId);

  return (
    <>
      {/* <DetailMainDonasi
        dataDonasi={dataDonasi as any}
        countDonatur={countDonatur}
        userLoginId={userLoginId as string}
      /> */}
      <DetailMainDonasiNew />
    </>
  );
}
