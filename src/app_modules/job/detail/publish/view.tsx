"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Button, Group, Modal, Paper, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funEditArsipById } from "../../fun/edit/fun_edit_arsip_by_id";
import { gs_job_hot_menu,  } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";

export default function Job_DetailPublish({ dataJob }: { dataJob: MODEL_JOB }) {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={dataJob as any} />
        <ButtonAction jobId={dataJob.id} />
      </Stack>
    </>
  );
}

function ButtonAction({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure();


  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);

  async function onArsipkan() {
    await Job_funEditArsipById(jobId, true).then((res) => {
      if (res.status === 200) {

        setHotMenu(3);
        ComponentGlobal_NotifikasiBerhasil("Berhasil Diarsipkan");
        setLoading(true);
        router.replace(RouterJob.arsip);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      {/* <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          },
        }}
      >
        <Stack>
          <Title order={6} color="white" align="center">
            Mengarsipkan akan menghilangkan info lowongan kerja dari beranda,
            anda yakin ?
          </Title>
          <Group grow>
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
            <Button
              loading={isLoading ? true : false}
              loaderPosition="center"
              radius={"xl"}
              color="teal"
              onClick={() => {
                onArsipkan();
              }}
            >
              Arsip
            </Button>
          </Group>
        </Stack>
      </Modal> */}

      <UIGlobal_Modal
        opened={opened}
        close={() => close()}
        title={
          " Mengarsipkan akan menghilangkan info lowongan kerja dari beranda, anda yakin ?"
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
              onArsipkan();
            }}
          >
            Simpan
          </Button>
        }
      />

      <Button
        radius={"xl"}
        color="teal"
        my={"lg"}
        onClick={() => {
          open();
        }}
      >
        Arsipkan
      </Button>
    </>
  );
}
