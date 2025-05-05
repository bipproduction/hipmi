import { PencairanDanaDonasi } from "@/app_modules/donasi";
import { donasi_funGetListPencairanDanaById } from "@/app_modules/donasi/fun/get/get_list_pencairan_dana_by_id";
import { Donasi_getTotalPencairanDanaById } from "@/app_modules/donasi/fun/get/get_pencairan_dana_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  const totalAkumulasi = await Donasi_getTotalPencairanDanaById(donasiId);
  const listPencairan = await donasi_funGetListPencairanDanaById({page: 1, donasiId: donasiId});
  
  return (
    <>
      <PencairanDanaDonasi
        donasiId={donasiId}
        totalAkumulasi={totalAkumulasi as any}
        listPencairan={listPencairan as any}
      />
    </>
  );
}
