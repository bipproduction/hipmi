import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import { admin_funCheckStatusJob } from "../fun/get/fun_check_status_job";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";
import { IAdmin_ActiveChildId, IAdmin_ActivePage } from "./type_of_select_page";

export async function adminNotifikasi_findRouterJob({
  appId,
  notifikasiId,
  router,
  onChangeNavbar,
}: {
  appId: string;
  notifikasiId: string;
  router: AppRouterInstance;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
}) {
  const check = await admin_funCheckStatusJob({ id: appId });

  if (check.status == 200) {
    const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
      notifId: notifikasiId,
    });

    if (udpateReadNotifikasi.status == 200) {
      const path = `/dev/admin/job/child/${check.statusName}`;

      if (check.statusName == "draft") {
        ComponentAdminGlobal_NotifikasiPeringatan(
          "Status telah dirubah oleh user"
        );
      } else {
        if (check.statusName == "publish") {
          onChangeNavbar({
            id: "Job",
            childId: "Job_2",
          });
        }

        if (check.statusName == "review") {
          onChangeNavbar({
            id: "Job",
            childId: "Job_3",
          });
        }

        if (check.statusName == "reject") {
          onChangeNavbar({
            id: "Job",
            childId: "Job_4",
          });
        }

        router.push(path, { scroll: false });
      }
    }

    return true;
  } else {
    ComponentAdminGlobal_NotifikasiPeringatan("Status telah dirubah oleh user");
    return false;
  }
}
