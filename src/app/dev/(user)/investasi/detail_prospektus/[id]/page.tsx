import { DetailPropektus } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataInvestasi = await getOneInvestasiById(params.id);

  return (
    <>
      <DetailPropektus dataInvestasi={dataInvestasi as any} />
    </>
  );
}
