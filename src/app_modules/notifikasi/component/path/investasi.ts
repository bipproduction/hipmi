import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MODEL_NOTIFIKASI } from "../../model/interface";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { notifikasi_funDonasiCheckStatus } from "../../fun/check/fun_check_donasi_status";
import notifikasi_getByUserId from "../../fun/get/get_notifiaksi_by_id";
import notifikasi_countUserNotifikasi from "../../fun/count/fun_count_by_id";
import notifikasi_funUpdateIsReadById from "../../fun/update/fun_update_is_read_by_user_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { notifikasi_funInvestasiCheckStatus } from "../../fun/check/fun_check_investasi_status";
import {
  notifikasi_funGetStatusTransaksiById,
  notifikasi_funInvestasiChecInvestaorStatus,
} from "../../fun";

export async function redirectInvestasiPage({
  appId,
  dataId,
  categoryPage,
  router,
  onLoadDataEvent,
  onSetMenuId,
  onSetVisible,
  onLoadCountNtf,
}: {
  appId: string;
  dataId: string;
  categoryPage: string;
  router: AppRouterInstance;
  onLoadDataEvent: (val: any) => void;
  onSetMenuId(val: number): void;
  onSetVisible(val: boolean): void;
  onLoadCountNtf(val: number): void;
}) {
  const check = await notifikasi_funInvestasiCheckStatus({ id: appId });
  const checkInvestor = await notifikasi_funInvestasiChecInvestaorStatus({
    id: appId,
  });

  if (check.status == 200) {
    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);
      onSetMenuId(1);

      if (check.statusName == "publish") {
        router.push(`/dev/investasi/detail/${appId}`, { scroll: false });
      } else {
        const path = `/dev/investasi/detail/portofolio/${appId}`;
        router.push(path, { scroll: false });
      }
    }
  } else if (checkInvestor.status == 200) {
    const updateReadNotifikasi = await notifikasi_funUpdateIsReadById({
      notifId: dataId,
    });

    if (updateReadNotifikasi.status == 200) {
      onSetVisible(true);
      onSetMenuId(1);

      if (checkInvestor.statusName == "berhasil") {
        const path = `/dev/investasi/detail/saham/${appId}`;
        router.push(path, { scroll: false });
      }

      if (checkInvestor.statusName == "gagal") {
        const path = `/dev/investasi/status-transaksi/gagal/${appId}`;
        router.push(path, { scroll: false });
      }
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Status tidak ditemukan");
  }
}
