"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Center,
  Stack
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetJobById } from "../../lib/api_fetch_job";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { Job_funEditArsipById } from "../../fun/edit/fun_edit_arsip_by_id";
import { gs_job_hot_menu } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";

export default function Job_DetailPublish() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_JOB | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetJobById({
        id: param.id,
      });

      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data job", error);
      setData(null);
    }
  };

  return (
    <>
      <Stack>
        <ComponentJob_DetailData data={data as any} />
        {!data ? (
          <Center>
            <CustomSkeleton height={40} width={"50%"} radius={"xl"} />
          </Center>
        ) : (
          <ButtonAction jobId={param.id} />
        )}
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

      <Center>
        <Button
          w="50%"
          radius={"xl"}
          color="teal"
          my={"lg"}
          onClick={() => {
            open();
          }}
        >
          Arsipkan
        </Button>
      </Center>
    </>
  );
}
