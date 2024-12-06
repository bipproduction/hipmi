import { AdminEvent_TablePublish } from "@/app_modules/admin/event";
import { adminEvent_funGetListPublish } from "@/app_modules/admin/event/fun";

async function Page() {
  const listPublish = await adminEvent_funGetListPublish({ page: 1 });

  return (
    <>
      <AdminEvent_TablePublish listPublish={listPublish as any} />
    </>
  );
}

export default Page;
