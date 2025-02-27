"use client";

import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Stack } from "@mantine/core";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_EVENT } from "../../_lib/interface";
import { IRealtimeData } from "@/lib/global_state";
import { WibuRealtime } from "wibu-pkg";
import { event_checkStatus } from "../../fun/get/fun_check_status_by_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetEventDetailById } from "../../_lib/api_event";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Event_DetailReview() {
  const params = useParams<{ id: string }>();
  const eventId = params.id as string;
  const [data, setData] = useState<MODEL_EVENT | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetEventDetailById({
        id: eventId,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail event", error);
    }
  }
  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentEvent_DetailData data={data} />
        {!data ? (
          <CustomSkeleton radius={"xl"} height={40} />
        ) : (
          <ButtonAction eventId={eventId} />
        )}
      </Stack>
    </>
  );
}

function ButtonAction({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button
        radius={"xl"}
        style={{ backgroundColor: MainColor.orange }}
        c={MainColor.darkblue}
        onClick={() => setOpenModal(true)}
      >
        Batalkan Review
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin ingin batalkan review?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            radius={"xl"}
            onClick={() => setOpenModal(false)}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{ backgroundColor: AccentColor.yellow }}
            loaderPosition="center"
            loading={isLoading}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => onClick(router, eventId, setLoading)}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}

async function onClick(
  router: AppRouterInstance,
  eventId: string,
  setLoading: any
) {
  const checkStatus = await event_checkStatus({ id: eventId });

  if (checkStatus) {
    const res = await Event_funEditStatusById("3", eventId);
    if (res.status === 200) {
      const dataNotifikasi: IRealtimeData = {
        appId: res.data?.id as any,
        status: res.data?.EventMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "EVENT",
        title: "Membatalkan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotifikasi as any,
      });

      if (notif.status === 201) {
        WibuRealtime.setData({
          type: "notification",
          pushNotificationTo: "ADMIN",
        });

        WibuRealtime.setData({
          type: "trigger",
          pushNotificationTo: "ADMIN",
          dataMessage: dataNotifikasi,
        });

        ComponentGlobal_NotifikasiBerhasil(res.message, 1500);
        setLoading(true);
        router.replace(RouterEvent.status({ id: "3" }));
      }
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  } else {
    ComponentGlobal_NotifikasiPeringatan("Event telah direview admin");
  }
}
