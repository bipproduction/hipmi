import { AdminColab_Dashboard } from "@/app_modules/admin/colab";
import adminColab_countGroupChat from "@/app_modules/admin/colab/fun/count/count_group_chat";
import adminColab_countIsPublish from "@/app_modules/admin/colab/fun/count/count_publish";
import adminColab_countIsReject from "@/app_modules/admin/colab/fun/count/count_reject";

export default async function Page() {
  // const countPublish = await adminColab_countIsPublish();
  // const countRoom = await adminColab_countGroupChat();
  // const countReject = await adminColab_countIsReject()

  return (
    <>
      <AdminColab_Dashboard
      />
    </>
  );
}
