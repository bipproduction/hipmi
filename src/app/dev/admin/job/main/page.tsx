import { AdminJob_Main } from "@/app_modules/admin/job";
import { AdminJob_funCountStatusByStatusId } from "@/app_modules/admin/job/fun/count/fun_count_job_by_status_id";

export default async function Page() {
    // const countPublish = await AdminJob_funCountStatusByStatusId("1")
    // const countReview = await AdminJob_funCountStatusByStatusId("2");
    // const countReject = await AdminJob_funCountStatusByStatusId("4");
    // const countArsip = await AdminJob_funCountStatusByStatusId("0")




    return (
      <>
        <AdminJob_Main
          // countPublish={countPublish as number}
          // countReview={countReview as number}
          // countReject={countReject as number}
          // countArsip={countArsip as number}
        />
      </>
    );
}