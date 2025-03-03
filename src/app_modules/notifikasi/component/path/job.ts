import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { notifikasi_funJobCheckStatus } from "../../fun/check/fun_check_job_status";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";

export async function notifikasi_jobCheckStatus({
  appId,
  dataId,
  router,
  onSetJobMenuId,
  onSetVisible,
}: {
  appId: string;
  dataId: string;
  router: AppRouterInstance;
  onSetJobMenuId(val: number): void;
  onSetVisible(val: boolean): void;
}) {
  const check = await notifikasi_funJobCheckStatus({
    id: appId,
  });

  if (check.status == 200) {
    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);
      const path = `/dev/job/detail/${check.statusName}/${appId}`;
      onSetJobMenuId(2);
      router.push(path, { scroll: false });
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
