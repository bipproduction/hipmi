import { EditCeritaPenggalangDonasi } from "@/app_modules/donasi";
import Donasi_getCeritaByDonasiId from "@/app_modules/donasi/fun/get/get_cerita_penggalang";

export default async function Page({ params }: { params: { id: string } }) {
  const dataCerita = await Donasi_getCeritaByDonasiId(params.id)

  return (
    <>
      <EditCeritaPenggalangDonasi dataCerita={dataCerita as any} />
    </>
  );
}
