"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { MODEL_JOB } from "../../model/interface";

export default function Job_DetailReview({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={dataJob} />
        <ButtonAction jobId={dataJob.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function onAction() {
    const update = await Job_funEditStatusByStatusId(jobId, "3");
    if (update.status === 200) {
      setLoading(true);

      const dataNotif = {
        appId: update.data?.id as any,
        kategoriApp: "JOB",
        status: update.data?.MasterStatus?.name as any,
        userId: update.data?.authorId as any,
        pesan: update.data?.title as any,
        title: "Membatalkan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
      }

      ComponentGlobal_NotifikasiBerhasil("Berhasil Dibatalkan");
      router.replace(RouterJob.status({ id: "3" }));

      setLoading(false);
    } else {
      ComponentGlobal_NotifikasiGagal(update.message);
      setLoading(false);
    }
  }
  return (
    <>
      <UIGlobal_Modal
        opened={isOpen}
        close={() => setOpen(false)}
        title={"Anda yakin membatalkan review ?"}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setOpen(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading}
            radius={"xl"}
            color="orange"
            onClick={() => {
              onAction();
            }}
          >
            Simpan
          </Button>
        }
      />

      <Button
        radius={"xl"}
        color="orange"
        my={"xl"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Batalkan Review
      </Button>
    </>
  );
}
