import { EditDonasi, EditDonasiNew } from "@/app_modules/donasi";
import { Donasi_getMasterDurasi, Donasi_getMasterKategori } from "@/app_modules/donasi/fun";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  // const dataDonasi = await Donasi_getOneById(params.id)
  // const masterKategori = await Donasi_getMasterKategori()
  // const masterDurasi = await Donasi_getMasterDurasi()

  return (
    <>
      {/* <EditDonasi dataDonasi={dataDonasi as any} masterKategori={masterKategori} masterDurasi={masterDurasi} /> */}
      <EditDonasiNew />
    </>
  );
}
