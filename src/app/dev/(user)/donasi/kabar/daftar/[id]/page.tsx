import { Donasi_UiDaftarKabar } from "@/app_modules/donasi/_ui";
import { donasi_funGetListKabarById } from "@/app_modules/donasi/fun/get/get_list_kabar";

async function Page({ params }: { params: { id: string } }) {
  const donasiId = params.id;
  const listKabar = await donasi_funGetListKabarById({
    page: 1,
    donasiId: donasiId,
  });

  return (
    <>
      <Donasi_UiDaftarKabar dataDonasi={listKabar as any} donasiId={donasiId}/>
    </>
  );
}

export default Page;
