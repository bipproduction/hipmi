import { AdminDonasi_DetailPublish } from "@/app_modules/admin/donasi";
import { AdminDonasi_funCountDonatur } from "@/app_modules/admin/donasi/fun/count/fun_count_donatur";
import { AdminDonasi_getListPencairanDana } from "@/app_modules/admin/donasi/fun/get/get_list_pencairan_dana_by_id";

export default async function Page() {
  return (
    <>
      <AdminDonasi_DetailPublish />
    </>
  );
}
