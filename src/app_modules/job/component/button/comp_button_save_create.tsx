"use client";

import { DIRECTORY_ID } from "@/lib";
import { IRealtimeData } from "@/lib/global_state";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { notifikasiToAdmin_funCreate } from "@/app_modules/notifikasi/fun";
import { clientLogger } from "@/util/clientLogger";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { job_funCreateNoFile, job_funCreateWithFile } from "../../fun";
import { gs_job_hot_menu } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";
import { apiCreatedJob } from "../../lib/api_fetch_job";
import {
  apiCreatedNotificationToAdmin,
  apiGetSeasonUserId,
} from "@/app_modules/_global/lib/api_fetch_global";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetUserId } from "@/app_modules/_global/lib/api_user";

function Job_ComponentButtonSaveCreate({
  value,
  file,
  userLoginId,
}: {
  value: MODEL_JOB;
  file: File;
  userLoginId: string;
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
          setIsLoading(false);

          ComponentGlobal_NotifikasiGagal(createNoFile.message);
        }
      } else {
        const uploadFile = await funGlobal_UploadToStorage({
          file: file,
          dirId: DIRECTORY_ID.job_image,
        });

        if (!uploadFile.success) {
          setIsLoading(false);
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
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(createWithFile.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error create job", error);
    }
  }

  // async function handleCreated() {
  //   try {
  //     let fixData;
  //     setIsLoading(true);

  //     if (file === null) {
  //       fixData = {
  //         ...value,
  //         authorId: userLoginId,
  //       };
  //       const responseNoFile = await apiCreatedJob({
  //         data: fixData,
  //       });

  //       if (responseNoFile) {
  //         const dataNotifikasi: IRealtimeData = {
  //           appId: responseNoFile.data?.id as any,
  //           status: responseNoFile.data?.MasterStatus?.name as any,
  //           userId: responseNoFile.data?.authorId as any,
  //           pesan: responseNoFile.data?.title as any,
  //           kategoriApp: "JOB",
  //           title: "Job baru",
  //         };

  //         const responseNotification = await apiCreatedNotificationToAdmin({
  //           data: dataNotifikasi,
  //         });

  //         if (responseNotification) {
  //           WibuRealtime.setData({
  //             type: "notification",
  //             pushNotificationTo: "ADMIN",
  //           });

  //           WibuRealtime.setData({
  //             type: "trigger",
  //             pushNotificationTo: "ADMIN",
  //             dataMessage: dataNotifikasi,
  //           });

  //           setHotMenu(2);
  //           router.replace(RouterJob.status({ id: "2" }));
  //           ComponentGlobal_NotifikasiBerhasil(responseNoFile.message);
  //         }
  //       }
  //       // else {
  //       //   setIsLoading(false);
  //       //   ComponentGlobal_NotifikasiGagal(responseNoFile.message);
  //       // }
  //     } else {
  //       const uploadFile = await funGlobal_UploadToStorage({
  //         file: file,
  //         dirId: DIRECTORY_ID.job_image,
  //       });

  //       if (!uploadFile.success) {
  //         setIsLoading(false);
  //         ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
  //         return;
  //       }

  //       fixData = {
  //         ...value,
  //         authorId: userLoginId,
  //         imageId: uploadFile.data.id,
  //       };

  //       const responseWithFile = await apiCreatedJob({
  //         data: fixData,
  //       });

  //       if (responseWithFile.status === 201) {
  //         const dataNotifikasi: IRealtimeData = {
  //           appId: responseWithFile.data?.id as any,
  //           status: responseWithFile.data?.MasterStatus?.name as any,
  //           userId: responseWithFile.data?.authorId as any,
  //           pesan: responseWithFile.data?.title as any,
  //           kategoriApp: "JOB",
  //           title: "Job baru",
  //         };

  //         const notif = await notifikasiToAdmin_funCreate({
  //           data: dataNotifikasi as any,
  //         });

  //         if (notif.status === 201) {
  //           WibuRealtime.setData({
  //             type: "notification",
  //             pushNotificationTo: "ADMIN",
  //           });

  //           WibuRealtime.setData({
  //             type: "trigger",
  //             pushNotificationTo: "ADMIN",
  //             dataMessage: dataNotifikasi,
  //           });

  //           setHotMenu(2);
  //           router.replace(RouterJob.status({ id: "2" }));
  //           ComponentGlobal_NotifikasiBerhasil(responseWithFile.message);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     clientLogger.error("Error create job", error);
  //   }
  // }

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
        onClick={onCreate}
      >
        Simpan
      </Button>
    </>
  );
}

export default Job_ComponentButtonSaveCreate;
