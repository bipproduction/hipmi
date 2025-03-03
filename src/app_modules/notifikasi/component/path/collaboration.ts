import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";

export async function redirectDetailCollaborationPage({
  data,
  router,
  onSetVisible,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetVisible(val: boolean): void;
}) {
  try {
    if (data.status === "Partisipan Project") {
      const path = RouterColab.main_detail + data.appId;
      router.push(path, { scroll: false });
    }

    if (data.status === "Collaboration Group") {
      const path = RouterColab.grup_diskusi;
      router.push(path, { scroll: false });
    }

    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: data.id,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);
    }
  } catch (error) {
    console.error("Error get all forum :", error);
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
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
