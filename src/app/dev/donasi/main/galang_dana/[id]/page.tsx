import { GalangDanaDonasiNew } from "@/app_modules/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  // const statusId = params.id;

  // const listStatus = await donasi_funMasterStatusDonasi();
  // const dataDonasi = await donasi_funGetAllStatusById({
  //   page: 1,
  //   statusId: statusId,
  // });

  return (
    <>
      {/* <PostingDonasi
        statusId={statusId}
        dataStatus={dataDonasi}
        listStatus={listStatus}
      /> */}

      <GalangDanaDonasiNew />
    </>
  );
}
