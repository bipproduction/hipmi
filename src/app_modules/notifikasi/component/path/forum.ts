import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export function redirectDetailForumPage({
  data,
  router,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
}) {
  if (data.status === null) {
    const path = RouterForum.main_detail + data.appId;
    router.push(path, { scroll: false });
  }

  if (data.status === "Report Komentar") {
    const path = RouterForum.detail_report_komentar + data.appId;
    router.push(path, { scroll: false });
  }

  if (data.status === "Report Posting") {
    const path = RouterForum.detail_report_posting + data.appId;
    router.push(path, { scroll: false });
  }
}
