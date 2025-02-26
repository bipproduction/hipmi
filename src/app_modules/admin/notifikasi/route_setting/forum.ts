import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function adminNotifikasi_findRouterForum({
  data,
  router,
  onChangeNavbar,
  onToggleNavbar,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onChangeNavbar: (val: any) => void;
  onToggleNavbar: (val: any) => void;
}) {
  if (data.status === "Report Posting") {
    const routeName = RouterAdminForum.table_report_posting;
    router.push(routeName);
    onChangeNavbar({
      id: 7,
      childId: 73,
    });
  }

  if (data.status === "Report Komentar") {
    const routeName = RouterAdminForum.table_report_komentar;
    router.push(routeName);
    onChangeNavbar({
      id: 7,
      childId: 74,
    });
  }
}
