import { DetailReviewDonasi } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataDonasi = await Donasi_getOneById(params.id);

  return (
    <>
      <DetailReviewDonasi dataDonasi={dataDonasi as any} />
    </>
  );
}
