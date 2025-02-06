import { AdminJob_TablePublish } from "@/app_modules/admin/job";
import adminJob_getListPublish from "@/app_modules/admin/job/fun/get/get_list_publish";
import { AdminJob_getListTableByStatusId } from "@/app_modules/admin/job/fun/get/get_list_table_by_status_id";

export default async function Page() {
    

    return (
      <>
        <AdminJob_TablePublish  />
      </>
    );
}