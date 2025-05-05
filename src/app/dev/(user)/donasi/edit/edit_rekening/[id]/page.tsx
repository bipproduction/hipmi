import { Donasi_EditRekening } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  const data = await Donasi_getOneById(donasiId);
  const dataDonasi = {
    id: data?.id,
    namaBank: data?.namaBank,
    rekening: data?.rekening,
  };
  return (
    <>
      <Donasi_EditRekening dataDonasi={dataDonasi as any} />
    </>
  );
}
