import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import { admin_funCheckStatusJob } from "../fun/get/fun_check_status_job";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import adminNotifikasi_countNotifikasi from "../fun/count/count_is_read";
import adminNotifikasi_getByUserId from "../fun/get/get_notifikasi_by_user_id";
import { IAdmin_ActivePage, IAdmin_ActiveChildId } from "./type_of_select_page";

export async function adminNotifikasi_findRouterJob({
  appId,
  notifikasiId,
  router,
  activePage,
  // onLoadCountNotif,
  // onLoadDataNotifikasi ,
  onChangeNavbar,
}: {
  appId: string;
  notifikasiId: string;
  router: AppRouterInstance;
  activePage: number;
  // onLoadCountNotif: (val: any) => void;
  // onLoadDataNotifikasi: (val: any) => void; 
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
      // const loadCountNotif = await adminNotifikasi_countNotifikasi();
      // onLoadCountNotif(loadCountNotif);

      // const loadListNotifikasi = await adminNotifikasi_getByUserId({
      //   page: 1,
      // });
      // onLoadDataNotifikasi(loadListNotifikasi);

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
