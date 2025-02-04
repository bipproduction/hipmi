import { Admin_TableRejectInvestasi } from "@/app_modules/admin/investasi";
import { adminInvestasi_funGetAllReject } from "@/app_modules/admin/investasi/fun/get/get_all_reject";

export default async function Page() {
  // const dataInvestsi = await adminInvestasi_funGetAllReject({page: 1});
  return (
    <>
      <Admin_TableRejectInvestasi />
    </>
  );
}
