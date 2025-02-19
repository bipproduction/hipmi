import { Job_Status } from "@/app_modules/job";
import { job_funGetAllByStatusId } from "@/app_modules/job/fun";
import { job_funGetMasterStatus } from "@/app_modules/job/fun/get/get_master_status";

export default async function Page() {


  return (
    <>
      <Job_Status/>
    </>
  );
}
