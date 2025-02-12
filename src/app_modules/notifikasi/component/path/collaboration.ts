import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";

export function redirectDetailCollaborationPage({
  data,
  router,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
}) {
  if (data.status === "Partisipan Project") {
    const path = RouterColab.main_detail + data.appId;
    router.push(path, { scroll: false });
  }

 

  if (data.status === "Collaboration Group") {
    const path = RouterColab.grup_diskusi;
    router.push(path, { scroll: false });
  }

  //   if (data.status === "Report Komentar") {
  //     const path = RouterForum.detail_report_komentar + data.appId;
  //     router.push(path, { scroll: false });
  //   }

  //   if (data.status === "Report Posting") {
  //     const path = RouterForum.detail_report_posting + data.appId;
  //     router.push(path, { scroll: false });
  //   }
}
