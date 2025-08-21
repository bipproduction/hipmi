import AdminDeveloper from "@/app_modules/admin/developer";

export default async function Page() {
  // const listUser = await adminDeveloper_funGetListAllUser({ page: 1 });
  // const listAdmin = await adminDeveloper_funGetListAllAdmin({ page: 1 });

  return (
    <>
      <AdminDeveloper />
    </>
  );
}
