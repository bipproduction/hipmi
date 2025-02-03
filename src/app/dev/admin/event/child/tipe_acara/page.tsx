import { AdminEvent_DetailTipeAcara } from "@/app_modules/admin/event";
import { AdminEvent_getListTipeAcara } from "@/app_modules/admin/event/fun/get/get_list_tipe_acara";

export default async function Page() {
  // const listTipe = await AdminEvent_getListTipeAcara()

  return (
    <>
      <AdminEvent_DetailTipeAcara />
    </>
  );
}
