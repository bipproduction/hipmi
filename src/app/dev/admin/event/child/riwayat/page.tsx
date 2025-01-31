import { AdminEvent_Riwayat } from "@/app_modules/admin/event";
import { adminEvent_funGetListAllRiwayat } from "@/app_modules/admin/event/fun/get/get_list_all_riwayat";

export default async function Page() {
  // const listRiwayat = await adminEvent_funGetListAllRiwayat({ page: 1 });

  return (
    <>
      <AdminEvent_Riwayat  />
    </>
  );
}
