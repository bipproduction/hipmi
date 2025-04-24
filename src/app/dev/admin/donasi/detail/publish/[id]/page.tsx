import { AdminDonasi_DetailPublish } from "@/app_modules/admin/donasi";
import { AdminDonasi_funCountDonatur } from "@/app_modules/admin/donasi/fun/count/fun_count_donatur";
import { AdminDonasi_getListPencairanDana } from "@/app_modules/admin/donasi/fun/get/get_list_pencairan_dana_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  // const dataPublish = await AdminDonasi_getOneById(params.id);
  const countDonatur = await AdminDonasi_funCountDonatur(params.id);
  const listPencairan = await AdminDonasi_getListPencairanDana(params.id);

  return (
    <>
      <AdminDonasi_DetailPublish
        countDonatur={countDonatur}
        listPencairan={listPencairan as any}
      />
    </>
  );
}
