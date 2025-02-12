"use client";

import { Button, Stack } from "@mantine/core";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { MODEL_JOB } from "../../model/interface";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { useAtom } from "jotai";
import { Job_funEditArsipById } from "../../fun/edit/fun_edit_arsip_by_id";
import { gs_job_hot_menu } from "../../global_state";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";

export default function Job_DetailArsip({ dataJob }: { dataJob: MODEL_JOB }) {
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
  const [isLoading, setLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [opened, { open, close }] = useDisclosure();

  async function onPublish() {
    await Job_funEditArsipById(jobId, false).then((res) => {
      if (res.status === 200) {
        setHotMenu(1);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Dipublish");
        setLoading(true);
        router.replace(RouterJob.beranda);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <UIGlobal_Modal
        opened={opened}
        close={() => close()}
        title={
          " Mempublish akan menampilkan info lowongan kerja ke beranda, anda yakin ?"
        }
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
            radius={"xl"}
            color="teal"
            onClick={() => {
              onPublish();
            }}
          >
            Simpan
          </Button>
        }
      />

      <Button
        loaderPosition="center"
        loading={isLoading ? true : false}
        radius={"xl"}
        color="green"
        my={"lg"}
        onClick={() => {
          open();
        }}
      >
        Publish Lagi
      </Button>
    </>
  );
}
