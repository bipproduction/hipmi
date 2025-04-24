import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { notifikasi_funDonasiCheckStatus } from "../../fun/check/fun_check_donasi_status";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { notifikasi_checkAuthorDonasiById } from "../../fun/check/fun_check_author_donasi_by_id";
import { apiNotifikasiDonasiCheckTransaksiById } from "../../lib/api_fetch_ntf_donasi";
import { cookies } from "next/headers";

export async function redirectDonasiPage({
  appId,
  dataId,
  userId,
  router,
  onSetMenuId,
  onSetVisible,
}: {
  appId: string;
  dataId: string;
  userId: string;
  router: AppRouterInstance;
  onSetMenuId(val: number): void;
  onSetVisible(val: boolean): void;
}) {
  const check = await notifikasi_funDonasiCheckStatus({ id: appId });

  if (check.statusName == "") {
    const checkTransaksi = await apiNotifikasiDonasiCheckTransaksiById({
      id: appId,
    });

    if (checkTransaksi.success) {
      const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
        notifId: dataId,
      });

      if (updateReadNotifikasi.status == 200) {
        router.push(RouterDonasi.main_donasi_saya, { scroll: false });
        onSetMenuId(2);
      }
    }
  } else {
    const checkAuthor = await notifikasi_checkAuthorDonasiById({
      donasiId: appId,
      userId: userId,
    });

    if (check.status == 200) {
      const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
        notifId: dataId,
      });

      if (updateReadNotifikasi.status == 200) {
        const pathToCreator = `/dev/donasi/detail/${check.statusName}/${appId}`;
        const pathToAllUser = `/dev/donasi/detail/main/${appId}`;

        if (checkAuthor) {
          router.push(pathToCreator, { scroll: false });
        } else {
          router.push(pathToAllUser, { scroll: false });
          onSetMenuId(1);
        }
      }
    } else {
      onSetVisible(false);
      ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
    }
  }
}
