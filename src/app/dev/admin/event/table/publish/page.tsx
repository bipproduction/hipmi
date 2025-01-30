import { AdminEvent_TablePublish } from "@/app_modules/admin/event";
import { adminEvent_funGetListPublish } from "@/app_modules/admin/event/fun";

async function Page() {
  return (
    <>
      <AdminEvent_TablePublish />
    </>
  );
}

export default Page;
