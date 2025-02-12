import { ITypeStatusNotifikasi } from "@/lib/global_state";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import adminNotifikasi_countNotifikasi from "../fun/count/count_is_read";
import { admin_funDonasiCheckStatus } from "../fun/get/fun_donasi_check_status";
import adminNotifikasi_getByUserId from "../fun/get/get_notifikasi_by_user_id";
import adminNotifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_id";
import { IAdmin_ActiveChildId, IAdmin_ActivePage } from "./type_of_select_page";

export default async function adminNotifikasi_findRouterDonasi({
  appId,
  notifikasiId,
  status,
  router,
  onLoadCountNotif,
  onLoadDataNotifikasi,
  onChangeNavbar,
}: {
  appId: string;
  notifikasiId: string;
  status: ITypeStatusNotifikasi;
  router: AppRouterInstance;
  onLoadCountNotif: (val: any) => void;
  onLoadDataNotifikasi: (val: any) => void;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
}) {
  if (
    status == "Menunggu" ||
    status == "Berhasil" ||
    status == "Proses" ||
    status == "Gagal"
  ) {
    const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
      notifId: notifikasiId,
    });

    if (udpateReadNotifikasi.status == 200) {
      const loadCountNotif = await adminNotifikasi_countNotifikasi();
      onLoadCountNotif(loadCountNotif);

      const loadListNotifikasi = await adminNotifikasi_getByUserId({
        page: 1,
      });
      onLoadDataNotifikasi(loadListNotifikasi);
      const path = RouterAdminDonasi_OLD.detail_publish + appId;
      router.push(path, { scroll: false });
      onChangeNavbar({
        id: "Donasi",
        childId: "Donasi_2",
      });
    } else {
      ComponentAdminGlobal_NotifikasiPeringatan("Status tidak ditemukan");
      return false;
    }

    return true;
  } else {
    const check = await admin_funDonasiCheckStatus({ id: appId });
    if (check.status == 200) {
      const udpateReadNotifikasi = await adminNotifikasi_funUpdateIsReadById({
        notifId: notifikasiId,
      });

      if (udpateReadNotifikasi.status == 200) {
        const loadCountNotif = await adminNotifikasi_countNotifikasi();
        onLoadCountNotif(loadCountNotif);

        const loadListNotifikasi = await adminNotifikasi_getByUserId({
          page: 1,
        });
        onLoadDataNotifikasi(loadListNotifikasi);

        const path = `/dev/admin/donasi/sub-menu/${check.statusName}`;

        if (check.statusName == "draft") {
          ComponentAdminGlobal_NotifikasiPeringatan(
            "Status telah dirubah oleh user"
          );
        } else {
          if (check.statusName == "publish") {
            onChangeNavbar({
              id: "Donasi",
              childId: "Donasi_2",
            });
          }

          if (check.statusName == "review") {
            onChangeNavbar({
              id: "Donasi",
              childId: "Donasi_3",
            });
          }

          if (check.statusName == "reject") {
            onChangeNavbar({
              id: "Donasi",
              childId: "Donasi_4",
            });
          }

          router.push(path, { scroll: false });
        }

        return true;
      }
    } else {
      ComponentAdminGlobal_NotifikasiPeringatan("Status tidak ditemukan");
      return false;
    }
  }
}
