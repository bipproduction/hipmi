"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { Button, Group, Stack } from "@mantine/core";

import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funDeleteById } from "../../fun/delete/fun_delete_by_id";
import { Job_funEditStatusByStatusId } from "../../fun/edit/fun_edit_status_by_status_id";
import { MODEL_JOB } from "../../model/interface";

export default function Job_DetailReject({ dataJob }: { dataJob: MODEL_JOB }) {
  const [data, setData] = useState(dataJob);

  return (
    <>
      <Stack>
        <ComponentGlobal_BoxInformation
          informasi={data.catatan}
          isReport={true}
        />
        <ComponentJob_DetailData data={data} />
        <ButtonAction jobId={data.id} imageId={data.imageId} />
      </Stack>
    </>
  );
}

function ButtonAction({ jobId, imageId }: { jobId: string; imageId: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  async function onEditKembali() {
    await Job_funEditStatusByStatusId(jobId, "3").then((res) => {
      if (res.status === 200) {
        router.replace(RouterJob.status({ id: "3" }));
        ComponentGlobal_NotifikasiBerhasil("Masuk Draft");
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
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

      router.replace(RouterJob.status({ id: "4" }));
      ComponentGlobal_NotifikasiBerhasil("Berhasil Hapus Job");
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
      setLoadingDelete(false);
    }
  }

  return (
    <>
      <UIGlobal_Modal
        opened={opened}
        close={() => close()}
        title={" Anda yakin ingin menghapus  ?"}
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
            loading={isLoadingDelete}
            loaderPosition="center"
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

      <Group grow my={"xl"}>
        <Button
          radius={"xl"}
          color="orange"
          onClick={() => {
            onEditKembali();
          }}
        >
          Edit Kembali
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
