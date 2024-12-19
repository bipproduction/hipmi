import { CreateDonasiNew } from "@/app_modules/donasi";


export default async function Page() {
  // const masterKategori = await Donasi_getMasterKategori();
  // const masterDurasi = await Donasi_getMasterDurasi();

  return (
    // <CreateDonasi masterKategori={masterKategori} masterDurasi={masterDurasi} />
    <CreateDonasiNew />
  );
}
