import { GalangDanaDonasiNew, PostingDonasi } from "@/app_modules/donasi";
import { donasi_funGetAllStatusById } from "@/app_modules/donasi/fun";
import { donasi_funMasterStatusDonasi } from "@/app_modules/donasi/fun/master/get_status_donasi";

export default async function Page({ params }: { params: { id: string } }) {
  const statusId = params.id;

  const listStatus = await donasi_funMasterStatusDonasi();
  const dataDonasi = await donasi_funGetAllStatusById({
    page: 1,
    statusId: statusId,
  });

  return (
    <>
      <PostingDonasi
        statusId={statusId}
        dataStatus={dataDonasi}
        listStatus={listStatus}
      />


      {/* NANTI AJA LANJUT -- KEJAR TAYANG :) */}
      {/* <GalangDanaDonasiNew listStatus={listStatus}/> */}
    </>
  );
}
