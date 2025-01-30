import { Admin_Investasi } from "@/app_modules/admin/investasi";
import Admin_CountStatusInvestasi from "@/app_modules/admin/investasi/fun/count_status";
import Admin_funGetAllInvestasi from "@/app_modules/admin/investasi/fun/get_all_investasi";
import Admin_getPublishProgresInvestasi from "@/app_modules/admin/investasi/fun/get_publish_progres";
import Admin_getTotalInvestasiByUser from "@/app_modules/admin/investasi/fun/get_total_investasi_by_user";

export default async function Page() {
  const listInvestasi = await Admin_funGetAllInvestasi();
  // const countDraft = await Admin_CountStatusInvestasi(1);
  // const countReview = await Admin_CountStatusInvestasi(2);
  // const countPublish = await Admin_CountStatusInvestasi(3);
  // const countReject = await Admin_CountStatusInvestasi(4);
  const totalInvestasiByUser = await Admin_getTotalInvestasiByUser()
  const publishProgres = await Admin_getPublishProgresInvestasi()
  // console.log(targetTerbesar)

  return (
    <>
      <Admin_Investasi
        listInvestasi={listInvestasi as any}
        // countDraft={countDraft}
        // countReview={countReview}
        // countPublish={countPublish}
        // countReject={countReject}
        totalInvestasiByUser={totalInvestasiByUser}
        publishProgres={publishProgres}

      />
      {/* <pre>{JSON.stringify(totalInvestasiByUser, null,2)}</pre> */}
    </>
  );
}
