import { AdminDonasi_DetailPublish } from "@/app_modules/admin/donasi";
import { AdminDonasi_funCountDonatur } from "@/app_modules/admin/donasi/fun/count/fun_count_donatur";
import { adminDonasi_getListDonatur } from "@/app_modules/admin/donasi/fun/get/get_list_donatur_by_id";
import { AdminDonasi_getListPencairanDana } from "@/app_modules/admin/donasi/fun/get/get_list_pencairan_dana_by_id";
import { AdminDonasi_getOneById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";
import adminDonasi_getMasterStatus from "@/app_modules/admin/donasi/fun/master/get_status_id";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  // const dataPublish = await AdminDonasi_getOneById(params.id);
  const countDonatur = await AdminDonasi_funCountDonatur(params.id);
  const listMasterStatus = await adminDonasi_getMasterStatus();
  const listDonatur = await adminDonasi_getListDonatur({
    donasiId: donasiId,
    page: 1,
  });
  const listPencairan = await AdminDonasi_getListPencairanDana(params.id);

  return (
    <>
      <AdminDonasi_DetailPublish
        // dataPublish={dataPublish as any}
        listDonatur={listDonatur as any}
        countDonatur={countDonatur}
        listPencairan={listPencairan as any}
        listMasterStatus={listMasterStatus as any}
      />
    </>
  );
}
