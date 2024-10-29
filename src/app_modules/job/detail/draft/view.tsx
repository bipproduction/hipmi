"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { Button, Group, Stack } from "@mantine/core";

import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import mqtt_client from "@/util/mqtt_client";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { MODEL_JOB } from "../../model/interface";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";

export default function Job_DetailDraft({ dataJob }: { dataJob: MODEL_JOB }) {
  const [data, setData] = useState(dataJob);

  return (
    <>
      <Stack>
        {data.catatan ? (
          <ComponentGlobal_BoxInformation
            informasi={data.catatan}
            isReport={true}
          />
        ) : (
          ""
        )}
        <ComponentJob_DetailData data={data} />
        <ButtonAction jobId={data.id} imageId={data.imageId} />
      </Stack>
    </>
  );
}

function ButtonAction({ jobId, imageId }: { jobId: string; imageId: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const [isAjukan, setAjukan] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  async function onAjukan() {
    const update = await Job_funEditStatusByStatusId(jobId, "2");
    if (update.status === 200) {
      setLoading(true);

      const dataNotif = {
        appId: update.data?.id as any,
        status: update.data?.MasterStatus?.name as any,
        userId: update.data?.authorId as any,
        pesan: update.data?.title as any,
        kategoriApp: "JOB",
        title: "Mengajukan review",
      };

      const notif = await notifikasiToAdmin_funCreate({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
      }

      ComponentGlobal_NotifikasiBerhasil("Berhasil Diajukan");
      router.replace(RouterJob.status({ id: "2" }));

      setLoading(false);
    } else {
      ComponentGlobal_NotifikasiGagal(update.message);
      setLoading(false);
    }
  }

  async function onDelete() {
    const res = await Job_funDeleteById(jobId);
    if (res.status === 200) {
      setLoadingDelete(true);

      if (imageId) {
        const delFile = await funGlobal_DeleteFileById({ fileId: imageId });
        if (!delFile.success) {
          ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar lama");
        }
      }

      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.replace(RouterJob.status({ id: "3" }));
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
      setLoadingDelete(false);
    }
  }

  return (
    <>
      {/* Ajukan */}
      <UIGlobal_Modal
        opened={isAjukan}
        close={() => setAjukan(false)}
        title={" Anda sudah yakin akan melakukan pengajuan review kembali ?"}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              setAjukan(false);
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loading={isLoading}
            loaderPosition="center"
            radius={"xl"}
            color="orange"
            onClick={() => {
              onAjukan();
            }}
          >
            Simpan
          </Button>
        }
      />

      {/* Hapus */}
      <UIGlobal_Modal
        opened={opened}
        close={() => close()}
        title={"Anda yakin ingin menghapus ?"}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => {
              close();
            }}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingDelete}
            radius={"xl"}
            color="red"
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        }
      />

      <Group grow my={"lg"}>
        <Button
          radius={"xl"}
          color="yellow"
          onClick={() => {
            setAjukan(true);
          }}
        >
          Ajukan Review
        </Button>
        <Button
          radius={"xl"}
          color="red"
          onClick={() => {
            open();
          }}
        >
          Hapus
        </Button>
      </Group>
    </>
  );
}
