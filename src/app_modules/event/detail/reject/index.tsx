"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Button, SimpleGrid, Stack } from "@mantine/core";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { Event_funDeleteById } from "../../fun/delete/fun_delete";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { MODEL_EVENT } from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color";

export default function Event_DetailReject({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  const [data, setData] = useState(dataEvent);
  return (
    <>
      <Stack spacing={"lg"}>
        <ComponentGlobal_BoxInformation isReport informasi={data.catatan} />
        <ComponentEvent_DetailData data={data} />
        <ButtonAction eventId={data.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  return (
    <>
      <SimpleGrid cols={2}>
        <Button
          style={{ backgroundColor: AccentColor.yellow }}
          w={"100%"}
          radius={"xl"}
          c={MainColor.darkblue}
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Edit Kembali
        </Button>
        <Button
          style={{ backgroundColor: MainColor.red }}
          w={"100%"}
          radius={"xl"}
          c={AccentColor.white}
          onClick={() => setOpenModal2(true)}
        >
          Hapus
        </Button>
      </SimpleGrid>

      {/* MODAL EDIT */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengedit kembali event ini ?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button style={{ color: AccentColor.white }} radius={"xl"} onClick={() => setOpenModal1(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{ backgroundColor: AccentColor.yellow }}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => {
              onUpdate(router, eventId);
              setOpenModal1(false);
            }}
          >
            Edit
          </Button>
        }
      />

      {/* MODAL HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus event ini?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button style={{ color: "black" }} radius={"xl"} onClick={() => setOpenModal2(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{ color: "black" }}
            radius={"xl"}
            color={"red"}
            onClick={() => {
              onDelete(router, eventId);
              setOpenModal2(false);
            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}

async function onUpdate(router: AppRouterInstance, eventId: string) {
  await Event_funEditStatusById("3", eventId).then((res) => {
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.push(RouterEvent.status({ id: "3" }));
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}

async function onDelete(router: AppRouterInstance, eventId: string) {
  const res = await Event_funDeleteById(eventId);
  if (res.status === 200) {
    ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
    router.back();
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}
