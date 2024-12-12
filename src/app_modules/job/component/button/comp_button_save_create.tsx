"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { IRealtimeData } from "@/app/lib/global_state";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { notifikasiToAdmin_funCreate } from "@/app_modules/notifikasi/fun";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { job_funCreateNoFile, job_funCreateWithFile } from "../../fun";
import { gs_job_hot_menu } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";
import { envs } from "@/lib/envs";

function Job_ComponentButtonSaveCreate({
  value,
  file,
}: {
  value: MODEL_JOB;
  file: File;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);

  async function onCreate() {
    try {
      setIsLoading(true);
      if (file === null) {
        const createNoFile = await job_funCreateNoFile({
          data: value,
        });

        if (createNoFile.status === 201) {
          const dataNotifikasi: IRealtimeData = {
            appId: createNoFile.data?.id as any,
            status: createNoFile.data?.MasterStatus?.name as any,
            userId: createNoFile.data?.authorId as any,
            pesan: createNoFile.data?.title as any,
            kategoriApp: "JOB",
            title: "Job baru",
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

            setHotMenu(2);
            router.replace(RouterJob.status({ id: "2" }));
            ComponentGlobal_NotifikasiBerhasil(createNoFile.message);
          }
        } else {
          ComponentGlobal_NotifikasiGagal(createNoFile.message);
        }
      } else {
        const uploadFile = await funGlobal_UploadToStorage({
          file: file,
          dirId: DIRECTORY_ID.job_image,
        });

        if (!uploadFile.success) {
          ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
          return;
        }

        const createWithFile = await job_funCreateWithFile({
          data: value,
          fileId: uploadFile.data.id,
        });

        if (createWithFile.status === 201) {
          const dataNotifikasi: IRealtimeData = {
            appId: createWithFile.data?.id as any,
            status: createWithFile.data?.MasterStatus?.name as any,
            userId: createWithFile.data?.authorId as any,
            pesan: createWithFile.data?.title as any,
            kategoriApp: "JOB",
            title: "Job baru",
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

            setHotMenu(2);
            router.replace(RouterJob.status({ id: "2" }));
            ComponentGlobal_NotifikasiBerhasil(createWithFile.message);
          }
        } else {
          ComponentGlobal_NotifikasiGagal(createWithFile.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (window.location.pathname !== RouterJob.status({ id: "2" })) {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <Button
        disabled={
          value.title === "" ||
          value.content === "" ||
          value.content === "<p><br></p>" ||
          value.content.length > 500 ||
          value.deskripsi === "" ||
          value.deskripsi === "<p><br></p>" ||
          value.deskripsi.length > 500
            ? true
            : false
        }
        style={{
          marginTop: 10,
          marginBottom: 30,
          transition: "0.5s",
          border:
            value.title === "" ||
            value.content === "" ||
            value.content === "<p><br></p>" ||
            value.content.length > 500 ||
            value.deskripsi === "" ||
            value.deskripsi === "<p><br></p>" ||
            value.deskripsi.length > 500
              ? ""
              : `2px solid ${AccentColor.yellow}`,
        }}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        loaderPosition="center"
        loading={isLoading ? true : false}
        w={"100%"}
        radius={"xl"}
        onClick={() => {
          onCreate();
        }}
      >
        Simpan
      </Button>
    </>
  );
}

export default Job_ComponentButtonSaveCreate;
