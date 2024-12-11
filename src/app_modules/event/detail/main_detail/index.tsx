"use client";

import { API_RouteEvent } from "@/app/lib/api_user_router/route_api_event";
import { IRealtimeData } from "@/app/lib/global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { Button, Skeleton, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import ComponentEvent_ListPeserta from "../../component/detail/list_peserta";
import { Event_countTotalPesertaById } from "../../fun/count/count_total_peserta_by_id";
import { Event_funJoinEvent } from "../../fun/create/fun_join_event";
import { Event_getListPesertaById } from "../../fun/get/get_list_peserta_by_id";

export default function Event_DetailMain({
  userLoginId,
  totalPeserta,
  eventId,
}: {
  userLoginId: string;
  totalPeserta: number;
  eventId: string;
}) {
  const [total, setTotal] = useState(totalPeserta);
  const [isLoading, setLoading] = useState(false);
  const [isJoinSuccess, setIsJoinSuccess] = useState<boolean | null>(null);
  const [isNewPeserta, setIsNewPeserta] = useState<boolean | null>(null);

  useShallowEffect(() => {
    onCheckPeserta();
  }, []);

  async function onCheckPeserta() {
    const res = await fetch(
      API_RouteEvent.check_peserta({ eventId: eventId, userId: userLoginId })
    );
    const data = await res.json();
    setIsJoinSuccess(data);
  }

  return (
    <>
      <Stack spacing={"lg"} pb={"md"}>
        <ComponentEvent_DetailMainData
          eventId={eventId}
        />

        {isJoinSuccess == null ? (
          <Skeleton radius={"xl"} h={40} />
        ) : isJoinSuccess ? (
          <Button disabled radius={"xl"} color="green">
            Anda Telah Ikut Serta
          </Button>
        ) : (
          <Button
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            color="green"
            onClick={() => {
              onJoin(
                userLoginId,
                eventId,
                setTotal,
                setLoading,
                setIsJoinSuccess,
                setIsNewPeserta
              );
            }}
          >
            JOIN
          </Button>
        )}

        <ComponentEvent_ListPeserta
          total={total}
          eventId={eventId}
          isNewPeserta={isNewPeserta}
        />
      </Stack>
    </>
  );
}

async function onJoin(
  userId: string,
  eventId: string,
  setTotal: any,
  setLoading: any,
  setIsJoinSuccess: (val: boolean | null) => void,
  setIsNewPeserta: any

) {
  const body = {
    userId: userId,
    eventId: eventId,
  };

  const userLoginId = userId;

  const res = await Event_funJoinEvent(body as any);
  if (res.status === 200) {
    const resPeserta = await Event_getListPesertaById(eventId);
    setIsNewPeserta(true);

    const resTotal = await Event_countTotalPesertaById(eventId);
    setTotal(resTotal);

    if (userLoginId !== res.data?.Event?.authorId) {
      const dataNotifikasi: IRealtimeData = {
        appId: res?.data?.Event?.id as any,
        status: "Peserta Event" as any,
        userId: res.data?.Event?.authorId as any,
        pesan: res.data?.Event?.title as any,
        kategoriApp: "EVENT",
        title: "Peserta baru event anda !",
      };

      const createNotifikasi = await notifikasiToUser_funCreate({
        data: dataNotifikasi as any,
      });

      if (createNotifikasi.status === 201) {
        WibuRealtime.setData({
          type: "notification",
          pushNotificationTo: "USER",
          dataMessage: dataNotifikasi,
        });
      }
    }
    setIsJoinSuccess(true);
    setLoading(true);
    ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}
