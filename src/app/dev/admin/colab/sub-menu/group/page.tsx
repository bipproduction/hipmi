import { AdminColab_TableGroup } from "@/app_modules/admin/colab";
import adminColab_getListAllGroupChat from "@/app_modules/admin/colab/fun/get/get_list_all_group_chat";

export default async function Page() {
  const listGroup = await adminColab_getListAllGroupChat({page: 1})

  return (
    <>
      <AdminColab_TableGroup  />
    </>
  );
}
