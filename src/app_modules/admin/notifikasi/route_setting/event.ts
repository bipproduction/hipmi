import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import { admin_funEventCheckStatus } from "../fun/get";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";
import { IAdmin_ActiveChildId, IAdmin_ActivePage } from "./type_of_select_page";

export async function adminNotifikasi_findRouterEvent({
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
  const check = await admin_funEventCheckStatus({ id: appId });

  if (check.status == 200) {
    const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
      notifId: notifikasiId,
    });

    if (udpateReadNotifikasi.status == 200) {
      const path = `/dev/admin/event/table/${check.statusName}`;

      if (check.statusName == "draft") {
        ComponentAdminGlobal_NotifikasiPeringatan(
          "Status telah dirubah oleh user"
        );
      } else {
        if (check.statusName == "publish") {
          onChangeNavbar({
            id: "Event",
            childId: "Event_2",
          });
        }

        if (check.statusName == "review") {
          onChangeNavbar({
            id: "Event",
            childId: "Event_3",
          });
        }

        if (check.statusName == "reject") {
          onChangeNavbar({
            id: "Event",
            childId: "Event_4",
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
