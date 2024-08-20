import { investasi_funGetOneInvestasiById } from "@/app_modules/investasi/_fun";
import { Investasi_UiProsesTransaksi } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const dataInvestasi = await investasi_funGetOneInvestasiById({ investasiId });

  return (
    <>
      <Investasi_UiProsesTransaksi dataInvestasi={dataInvestasi} />
    </>
  );
}
