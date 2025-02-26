import { Admin_TableReviewInvestasi } from "@/app_modules/admin/investasi";
import { adminInvestasi_funGetAllReview } from "@/app_modules/admin/investasi/fun/get/get_all_review";

export default async function Page() {
  return (
    <>
      <Admin_TableReviewInvestasi />
    </>
  );
}
