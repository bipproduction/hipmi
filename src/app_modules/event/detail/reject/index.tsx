"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group, SimpleGrid, Stack } from "@mantine/core";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { Event_funDeleteById } from "../../fun/delete/fun_delete";
import { Event_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetEventDetailById } from "../../_lib/api_event";
import { MODEL_EVENT } from "../../_lib/interface";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Event_DetailReject() {
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
        <ButtonAction eventId={eventId} data={data} />
      </Stack>
    </>
  );
}

function ButtonAction({ eventId, data }: { eventId: string , data: MODEL_EVENT | null}) {
  const router = useRouter();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);

  async function onUpdate(
    router: AppRouterInstance,
    eventId: string,
    setLoading: any
  ) {
    try {
      setLoading(true);
      await Event_funEditStatusById("3", eventId).then((res) => {
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.push(RouterEvent.status({ id: "3" }));
        } else {
          setLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      });
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update event", error);
    }
  }

  async function onDelete(
    router: AppRouterInstance,
    eventId: string,
    setLoading2: any
  ) {
    try {
      setLoading2(true);
      const res = await Event_funDeleteById(eventId);
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
        router.back();
      } else {
        setLoading2(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading2(false);
      clientLogger.error("Error delete event", error);
    }
  }

  return (
    <>
      {!data ? (
        <Group grow>
          <CustomSkeleton height={40} radius="xl" />
          <CustomSkeleton height={40} radius="xl" />
        </Group>
      ) : (
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
      )}

      {/* MODAL EDIT */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengedit kembali event ini ?"}
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
            loaderPosition="center"
            style={{ backgroundColor: AccentColor.yellow }}
            radius={"xl"}
            c={MainColor.darkblue}
            loading={isLoading ? true : false}
            onClick={() => {
              onUpdate(router, eventId, setLoading);
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
            loading={isLoading2 ? true : false}
            loaderPosition="center"
            style={{ backgroundColor: MainColor.red }}
            radius={"xl"}
            c={AccentColor.white}
            onClick={() => {
              onDelete(router, eventId, setLoading2);
            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
