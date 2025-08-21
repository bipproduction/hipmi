import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IAdmin_ActivePage, IAdmin_ActiveChildId } from "./type_of_select_page";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";

export default async function adminNotifikasi_findRouterForum({
  data,
  router,
  onChangeNavbar,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
}) {
  const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
    notifId: data.id,
  });
  if (udpateReadNotifikasi.status == 200) {
    let pagePath = "";
    if (data.status === "Report Posting") {
      pagePath = RouterAdminForum.table_report_posting;
      // router.push(routeName);
      onChangeNavbar({
        id: "Forum",
        childId: "Forum_3",
      });
    }

    if (data.status === "Report Komentar") {
      pagePath = RouterAdminForum.table_report_komentar;
      // router.push(routeName);
      onChangeNavbar({
        id: "Forum",
        childId: "Forum_4",
      });
    }
    return pagePath;
  } else {
    return "";
  }
}
