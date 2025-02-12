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

export async function redirectDonasiPage({
  appId,
  dataId,
  categoryPage,
  userId,
  userLoginId,
  router,
  onLoadDataEvent,
  onSetMenuId,
  onSetVisible,
  onLoadCountNtf,
}: {
  appId: string;
  dataId: string;
  categoryPage: string;
  userId: string;
  userLoginId: string;
  router: AppRouterInstance;
  onLoadDataEvent: (val: any) => void;
  onSetMenuId(val: number): void;
  onSetVisible(val: boolean): void;
  onLoadCountNtf(val: number): void;
}) {
  const check = await notifikasi_funDonasiCheckStatus({ id: appId });
  const checkAuthor = await notifikasi_checkAuthorDonasiById({
    donasiId: appId,
    userId: userId,
  });

  if (check.status == 200) {
    // const loadListNotifikasi = await notifikasi_getByUserId({
    //   page: 1,
    //   kategoriApp: categoryPage as any,
    // });
    // onLoadDataEvent(loadListNotifikasi);

    // const loadCountNotifikasi = await notifikasi_countUserNotifikasi();
    // onLoadCountNtf(loadCountNotifikasi);

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
