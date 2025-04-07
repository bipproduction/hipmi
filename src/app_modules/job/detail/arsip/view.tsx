"use client";

import { Button, Center, Stack } from "@mantine/core";
import ComponentJob_DetailData from "../../component/detail/detail_data";
import { MODEL_JOB } from "../../model/interface";
import { useParams, useRouter } from "next/navigation";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { useAtom } from "jotai";
import { Job_funEditArsipById } from "../../fun/edit/fun_edit_arsip_by_id";
import { gs_job_hot_menu } from "../../global_state";
import { useState } from "react";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { clientLogger } from "@/util/clientLogger";
import { apiGetJobById } from "../../lib/api_fetch_job";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Job_DetailArsip() {
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

      <Center>
        <Button
          w="50%"
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
      </Center>
    </>
  );
}
