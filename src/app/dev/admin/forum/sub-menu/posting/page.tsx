import { AdminForum_TablePublish } from "@/app_modules/admin/forum";
import { adminForum_getListPosting } from "@/app_modules/admin/forum/fun/get/get_list_publish";

export default async function Page() {
  

  return (
    <>
      <AdminForum_TablePublish  />
    </>
  );
}
