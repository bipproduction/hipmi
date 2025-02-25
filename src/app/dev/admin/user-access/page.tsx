import { AdminUserAccess_View } from "@/app_modules/admin/user-access";
import adminUserAccess_getListUser from "@/app_modules/admin/user-access/fun/get/get_list_all_user";

export default async function Page() {
  // const listUser = await adminUserAccess_getListUser({ page: 1 });

  return (
    <>
      <AdminUserAccess_View />
    </>
  );
}
