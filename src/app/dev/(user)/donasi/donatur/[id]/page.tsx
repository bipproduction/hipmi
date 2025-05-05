import { DonaturDonasi } from "@/app_modules/donasi";
import { donasi_funGetListDonaturById } from "@/app_modules/donasi/fun/get/get_list_donatur";

export default async function Page({ params }: { params: { id: string } }) {
  const donasiId = params.id;
  const listDonatur = await donasi_funGetListDonaturById({
    page: 1,
    donasiId: donasiId,
  });

  return (
    <>
      <DonaturDonasi listDonatur={listDonatur as any} donasiId={donasiId} />
    </>
  );
}
