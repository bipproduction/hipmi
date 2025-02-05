import { Admin_TablePublishInvestasi } from "@/app_modules/admin/investasi";
import { adminInvestasi_funGetAllPublish } from "@/app_modules/admin/investasi/fun/get/get_all_publish";

export default async function Page() {
  // const listInvestasi = await adminInvestasi_funGetAllPublish({page: 1});

  return (
    <>
      <Admin_TablePublishInvestasi  />
    </>
  );
}
