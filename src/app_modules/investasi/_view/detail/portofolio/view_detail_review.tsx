"use client";

import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import { Investasi_ComponentDetailDataNonPublish } from "@/app_modules/investasi/_component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { investasi_funEditStatusById } from "@/app_modules/investasi/fun/edit/fun_edit_status_by_id";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Investasi_ViewDetailReview({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI>(dataInvestasi);
  const [openModal, setOpenModal] = useState(false);

  async function onChangeStatus() {
    const res = await investasi_funEditStatusById({
      investasiId: data.id,
      statusId: "3",
    });
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil("Review Dibatalkan");
      router.replace(NEW_RouterInvestasi.portofolio({ id: "3" }));

      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        status: res.data?.MasterStatusInvestasi?.name,
        kategoriApp: "INVESTASI",
        title: "Membatalkan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
      }
      setLoading(false);
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Stack spacing={"xl"}>
        <Investasi_ComponentDetailDataNonPublish data={data} />
        {/* Tombol Ajukan */}
        <Stack>
          <Button
            mb={"xl"}
            radius={50}
            style={{
              backgroundColor: MainColor.orange,
            }}
            c={MainColor.darkblue}
            onClick={() => setOpenModal(true)}
          >
            Batalkan Review
          </Button>
        </Stack>
      </Stack>

      <UIGlobal_Modal
        opened={openModal}
        close={() => setOpenModal(false)}
        title={"Anda yakin ingin batalkan review?"}
        buttonKiri={
          <Button style={{ color: AccentColor.white }} radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            
            style={{
              transition: "0.5s", color: "black",
              backgroundColor: AccentColor.yellow
            }}
            loaderPosition="center"
            loading={isLoading}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => onChangeStatus()}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}
