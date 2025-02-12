"use client";

import { IRealtimeData } from "@/lib/global_state";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { clientLogger } from "@/util/clientLogger";
import { Button, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { apiGetEventCekPeserta } from "../../_lib/api_event";
import ComponentEvent_DetailMainData from "../../component/detail/detail_main";
import { Event_funJoinEvent } from "../../fun/create/fun_join_event";

export default function Event_DetailMain({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const [isLoading, setLoading] = useState(false);
  const [isJoinSuccess, setIsJoinSuccess] = useState<boolean | null>(null);
  // const [isNewPeserta, setIsNewPeserta] = useState<boolean | null>(null);

  useShallowEffect(() => {
    onCheckPeserta();
  }, []);

  async function onCheckPeserta() {
    try {
      const respone = await apiGetEventCekPeserta({
        userId: userLoginId,
        eventId: eventId,
      });

      if (respone) {
        setIsJoinSuccess(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error check peserta", error);
    }
  }

  // [ON JOIN BUTTON]
  async function onJoin() {
    const body = {
      userId: userLoginId,
      eventId: eventId,
    };

    try {
      setLoading(true);
      const res = await Event_funJoinEvent(body as any);
      if (res.status === 200) {
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
        setLoading(false);
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error join event", error);
    }
  }

  return (
    <>
      <Stack spacing={"lg"} pb={"md"}>
        <ComponentEvent_DetailMainData />

        {isJoinSuccess == null ? (
          <CustomSkeleton radius={"xl"} h={40} />
        ) : isJoinSuccess ? (
          <Button disabled radius={"xl"} color="green">
            Anda Telah Ikut Serta
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: MainColor.green }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            c={AccentColor.white}
            onClick={() => {
              onJoin();
            }}
          >
            JOIN
          </Button>
        )}

        {/* <ComponentEvent_ListPeserta
          total={total}
          eventId={eventId}
          isNewPeserta={isNewPeserta}
        /> */}
      </Stack>
    </>
  );
}
