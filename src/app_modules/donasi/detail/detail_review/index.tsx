"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { MODEL_DONASI } from "../../model/interface";
import { donasi_checkStatus } from "../../fun";
import { WibuRealtime } from "wibu-pkg";
import { IRealtimeData } from "@/app/lib/global_state";
import { AccentColor, MainColor } from "@/app_modules/_global/color";

export default function DetailReviewDonasi({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const [donasi, setDonasi] = useState(dataDonasi);

  return (
    <>
      <Stack spacing={"xl"} pb={"md"}>
        <ComponentDonasi_DetailDataGalangDana donasi={donasi} />
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
        <ButtonBatalReview donasi={donasi} />
      </Stack>
    </>
  );
}
function ButtonBatalReview({ donasi }: { donasi: MODEL_DONASI }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  async function onChangeStatus() {
    const check = await donasi_checkStatus({ id: donasi.id });
    if (check) {
      const res = await Donasi_funGantiStatus(donasi.id, "3");
      if (res.status === 200) {
        // const dataNotif = {
        //   appId: res.data?.id as any,
        //   status: res.data?.DonasiMaster_Status?.name as any,
        //   userId: res.data?.authorId as any,
        //   pesan: res.data?.title as any,
        //   kategoriApp: "DONASI",
        //   title: "Membatalkan review",
        // };

        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.DonasiMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "DONASI",
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

          ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
          setLoading(true);
          router.push(RouterDonasi.status_galang_dana({ id: "3" }));
        }
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    } else {
      ComponentGlobal_NotifikasiPeringatan("Donasi telah direview admin");
    }
  }
  return (
    <>
      <Button
        mt={"lg"}
        style={{
          transition: "0.5s",
          backgroundColor: MainColor.orange
        }}
        radius={"xl"}
        
        c={MainColor.darkblue}
        onClick={() => setOpenModal(true)}
      >
        Batalkan Review
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin ingin batalkan review ?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button c={AccentColor.white} radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
          style={{ backgroundColor: AccentColor.yellow }}
            loaderPosition="center"
            loading={isLoading ? true : false}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => {
              onChangeStatus();
            }}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}
