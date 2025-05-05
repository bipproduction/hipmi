import { DetailBeritaInvestasi } from "@/app_modules/investasi";
import getOneBeritaInvestasiById from "@/app_modules/investasi/fun/get_one_berita_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const dataBerita = await getOneBeritaInvestasiById(investasiId);
  // console.log(dataBerita)

  return (
    <>
      <DetailBeritaInvestasi
        dataBerita={dataBerita as any}
        investasiId={investasiId}
      />
    </>
  );
}
