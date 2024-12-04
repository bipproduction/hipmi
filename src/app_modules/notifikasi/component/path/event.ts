import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { notifikasi_funEventCheckStatus } from "../../fun";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";

export async function notifikasi_eventCheckStatus({
  appId,
  dataId,
  categoryPage,
  router,
  onLoadDataEvent,
  onSetEventMenuId,
  onSetVisible,
  onLoadCountNtf,
}: {
  appId: string;
  dataId: string;
  categoryPage: string
  router: AppRouterInstance;
  onLoadDataEvent: (val: any) => void;
  onSetEventMenuId(val: number): void;
  onSetVisible(val: boolean): void;
  onLoadCountNtf(val: number): void;
}) {
  const check = await notifikasi_funEventCheckStatus({ id: appId });

  if (check.status == 200) {
    const loadListNotifikasi = await notifikasi_getByUserId({
      page: 1,
      kategoriApp: categoryPage as any,
    });
    onLoadDataEvent(loadListNotifikasi);

    const loadCountNotifikasi = await notifikasi_countUserNotifikasi();
    onLoadCountNtf(loadCountNotifikasi);

    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);

      const path = `/dev/event/detail/${check.statusName}/${appId}`;
      onSetEventMenuId(1);
      router.push(path, { scroll: false });
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
