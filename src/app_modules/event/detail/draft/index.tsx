"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { IRealtimeData } from "@/lib/global_state";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { apiGetEventDetailById } from "../../_lib/api_event";
import { MODEL_EVENT } from "../../_lib/interface";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { Event_funDeleteById } from "../../fun/delete/fun_delete";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";

export default function Event_DetailDraft() {
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
      <Stack spacing={"lg"}>
        <ComponentEvent_DetailData isReport data={data} />
        <ButtonAction
          eventId={eventId}
          endDate={data?.tanggalSelesai}
        />
      </Stack>
    </>
  );
}

function ButtonAction({ eventId, endDate }: { eventId: string; endDate: any }) {
  const router = useRouter();
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const [isLoadingAjukan, setLoadingAjukan] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  async function onDelete() {
    try {
      const res = await Event_funDeleteById(eventId);
      try {
        setLoadingDelete(true);
        if (res.status === 200) {
          router.back();
          ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        } else {
          setLoadingDelete(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } catch (error) {
        setLoadingDelete(false);
        clientLogger.error("Error delete event", error);
      }
    } catch (error) {
      console.log("Error delete event", error);
      setLoadingDelete(false);
    }
  }

  async function onAjukan() {
    // console.log("end Date", endDate)

    if (moment(endDate).diff(moment(), "minutes") < 0)
      return ComponentGlobal_NotifikasiPeringatan("Waktu acara telah lewat");

    try {
      setLoadingAjukan(true);
      const res = await Event_funEditStatusById("2", eventId);
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.EventMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "EVENT",
          title: "Mengajukan review",
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
        }
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        router.replace(RouterEvent.status({ id: "2" }));
      } else {
        setLoadingAjukan(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoadingAjukan(false);
      clientLogger.error("Error ajukan event", error);
    }
  }

  return (
    <>
      {!endDate ? (
        <Group grow>
          <CustomSkeleton height={40} radius="xl" />
          <CustomSkeleton height={40} radius="xl" />
        </Group>
      ) : (
        <Group grow>
          <Button
            radius={"xl"}
            c={MainColor.darkblue}
            style={{ backgroundColor: AccentColor.yellow }}
            onClick={() => {
              setOpenModal1(true);
            }}
          >
            Ajukan Review
          </Button>
          <Button
            radius={"xl"}
            c={AccentColor.white}
            style={{ backgroundColor: MainColor.red }}
            onClick={() => {
              setOpenModal2(true);
            }}
          >
            Hapus
          </Button>
        </Group>
      )}

      {/* MODAL AJUKAN */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengajukan event ini?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            radius={"xl"}
            onClick={() => setOpenModal1(false)}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{ backgroundColor: AccentColor.yellow }}
            loaderPosition="center"
            loading={isLoadingAjukan ? true : false}
            radius={"xl"}
            onClick={() => {
              onAjukan();
            }}
            c={MainColor.darkblue}
          >
            Ajukan
          </Button>
        }
      />

      {/* MODAL HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus event ini?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            radius={"xl"}
            onClick={() => setOpenModal2(false)}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingDelete ? true : false}
            radius={"xl"}
            onClick={() => {
              onDelete();
            }}
            style={{ backgroundColor: MainColor.red }}
            c={AccentColor.white}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
