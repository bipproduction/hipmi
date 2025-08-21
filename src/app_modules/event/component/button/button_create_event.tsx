import { MainColor } from "@/app_modules/_global/color";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { notifikasiToAdmin_funCreate } from "@/app_modules/notifikasi/fun";
import { IRealtimeData } from "@/lib/global_state";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { clientLogger } from "@/util/clientLogger";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Event_funCreate } from "../../fun/create/fun_create";
import { gs_event_hotMenu } from "../../global_state";

export default function Event_ComponentCreateButton({
  value,
  diffTimeStart,
  diffTimeEnd,
}: {
  value: any;
  diffTimeStart: number;
  diffTimeEnd: number;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);
  const [isLoading, setLoading] = useState(false);

  async function onSave() {
    try {
      setLoading(true);
      const res = await Event_funCreate(value);

      if (res.status === 201) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.EventMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "EVENT",
          title: "Event baru",
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

          ComponentGlobal_NotifikasiBerhasil(res.message);
          setHotMenu(1);
          router.push(RouterEvent.status({ id: "2" }), { scroll: false });
        }
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error create event", error);
    }
  }

  return (
    <>
      <Button
        style={{
          transition: "0.5s",
        }}
        disabled={
          value.title === "" ||
          value.lokasi === "" ||
          value.eventMaster_TipeAcaraId === 0 ||
          value.tanggal === "function Date() { [native code] }" ||
          // moment(value.tanggal).diff(moment(), "minutes") < 0
          diffTimeEnd - 1 < diffTimeStart ||
          // value.deskripsi === "" ||
          funReplaceHtml({ html: value.deskripsi }).length > maxInputLength ||
          funReplaceHtml({ html: value.deskripsi }).length === 0
        }
        loaderPosition="center"
        loading={isLoading}
        radius={"xl"}
        mt={"xl"}
        onClick={() => {
          onSave();
        }}
        bg={MainColor.yellow}
        color="yellow"
        c={MainColor.darkblue}
      >
        Simpan
      </Button>
    </>
  );
}
