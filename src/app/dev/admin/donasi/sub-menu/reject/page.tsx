import { AdminDonasi_TableReject } from "@/app_modules/admin/donasi";
import adminDonasi_getListReject from "@/app_modules/admin/donasi/fun/get/get_list_reject";

export default async function Page() {
  // const dataReject = await adminDonasi_getListReject({ page: 1 });
  // console.log(dataReject)
  return (
    <>
      <AdminDonasi_TableReject />
    </>
  );
}
