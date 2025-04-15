import { AdminUserAccess_View } from "@/app_modules/admin/user-access";

export default async function Page() {
  // const listUser = await adminUserAccess_getListUser({ page: 1 });

  return (
    <>
      <AdminUserAccess_View />
    </>
  );
}
