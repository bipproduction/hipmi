"use client";

import { IRealtimeData } from "@/app/lib/global_state";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { Button, Group, Stack } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Event_ComponentSkeletonDetailData } from "../../component";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { Event_funDeleteById } from "../../fun/delete/fun_delete";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_DetailDraft({
  dataEvent,
  eventId,
}: {
  dataEvent: MODEL_EVENT;
  eventId: string;
}) {
  const [data, setData] = useState<MODEL_EVENT | null>(dataEvent);

  if (!data) {
    return (
      <>
        <Event_ComponentSkeletonDetailData />
      </>
    );
  }

  return (
    <>
      {/* <pre>{JSON.stringify(dataEvent.tanggal)}</pre> */}
      <Stack spacing={"lg"}>
        {data?.catatan ? (
          <ComponentGlobal_BoxInformation isReport informasi={data?.catatan} />
        ) : (
          ""
        )}
        <ComponentEvent_DetailData data={data} />
        <ButtonAction eventId={data.id} tanggalSelesai={data.tanggalSelesai} />
      </Stack>
    </>
  );
}

function ButtonAction({
  eventId,
  tanggalSelesai,
}: {
  eventId: string;
  tanggalSelesai?: any;
}) {
  const router = useRouter();
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const [isLoadingAjukan, setLoadingAjukan] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  async function onDelete() {
    const res = await Event_funDeleteById(eventId);
    if (res.status === 200) {
      router.back();
      ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
      setLoadingDelete(true);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  async function onAjukan() {
    if (
      moment(tanggalSelesai.toISOString().toString()).diff(
        moment(),
        "minutes"
      ) < 0
    )
      return ComponentGlobal_NotifikasiPeringatan("Waktu acara telah lewat");

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
      setLoadingAjukan(true);
      router.replace(RouterEvent.status({ id: "2" }));
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Group grow>
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          color="red"
          onClick={() => {
            setOpenModal2(true);
          }}
        >
          Hapus
        </Button>
      </Group>

      {/* MODAL AJUKAN */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengajukan event ini?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal1(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingAjukan ? true : false}
            radius={"xl"}
            onClick={() => {
              onAjukan();
            }}
            color="yellow"
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
          <Button radius={"xl"} onClick={() => setOpenModal2(false)}>
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
            color="red"
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
