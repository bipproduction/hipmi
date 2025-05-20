import { DetailDraftDonasi } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const donasiId = params.id
  const dataDonasi = await Donasi_getOneById(donasiId);
 

  return (
    <>
      <DetailDraftDonasi dataDonasi={dataDonasi as any} />
    </>
  );
}
