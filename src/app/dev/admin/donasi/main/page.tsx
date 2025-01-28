import { AdminDonasi_Main } from "@/app_modules/admin/donasi";
import AdminDonasi_funCountByStatus from "@/app_modules/admin/donasi/fun/count/fun_count_donasi_by_status";

export default async function Page() {
  const countPublish = await AdminDonasi_funCountByStatus("1");
  const countReview = await AdminDonasi_funCountByStatus("2");
  const countDraft = await AdminDonasi_funCountByStatus("3");
  const countReject = await AdminDonasi_funCountByStatus("4");

  return (
    <>
      <AdminDonasi_Main
        countPublish={countPublish as number}
        countReview={countReview as number}
        countReject={countReject as number}
      />
    </>
  );
}
