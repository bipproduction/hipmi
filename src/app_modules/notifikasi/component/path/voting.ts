import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import { notifikasi_funVotingCheckStatus } from "../../fun/check/fun_check_voting_status";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";

export async function notifikasi_votingCheckStatus({
  appId,
  dataId,
  router,
  onSetMenuId,
  onSetVisible,
}: {
  appId: string;
  dataId: string;
  router: AppRouterInstance;
  onSetMenuId(val: number): void;
  onSetVisible(val: boolean): void;
}) {
  const check = await notifikasi_funVotingCheckStatus({ id: appId });

  if (check.status == 200) {
    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);

      const path = `/dev/vote/detail/${check.statusName}/${appId}`;
      onSetMenuId(1);
      router.push(path, { scroll: false });
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
