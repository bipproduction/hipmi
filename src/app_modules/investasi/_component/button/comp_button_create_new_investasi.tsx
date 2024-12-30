"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color";
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
import { investasi_funCreateNewInvestasi } from "../../_fun";
import { gs_investas_menu, gs_investasi_status } from "../../g_state";
import { clientLogger } from "@/util/clientLogger";
import { IRealtimeData } from "@/app/lib/global_state";
import { WibuRealtime } from "wibu-pkg";

export function Investasi_ComponentButtonCreateNewInvestasi({
  data,
  totalLembar,
  fileImage,
  filePdf,
}: {
  data: any;
  totalLembar: number;
  fileImage: File;
  filePdf: File;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);

  async function onCreate() {
    try {
      setIsLoading(true);
      const body = {
        title: data.title,
        targetDana: data.targetDana,
        hargaLembar: data.hargaLembar,
        totalLembar: totalLembar,
        roi: data.roi,
        masterPeriodeDevidenId: data.periodeDevidenId,
        masterPembagianDevidenId: data.pembagianDevidenId,
        masterPencarianInvestorId: data.pencarianInvestorId,
      };

      const uploadImage = await funGlobal_UploadToStorage({
        file: fileImage,
        dirId: DIRECTORY_ID.investasi_image,
      });
      if (!uploadImage.success) {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
        return;
      }

      const uploadFilePdf = await funGlobal_UploadToStorage({
        file: filePdf,
        dirId: DIRECTORY_ID.investasi_prospektus,
      });
      if (!uploadFilePdf.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal upload file pdf");
        return;
      }

      const res = await investasi_funCreateNewInvestasi({
        data: body as any,
        fileImageId: uploadImage.data.id,
        filePdfId: uploadFilePdf.data.id,
      });

      if (res.status === 201) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as string,
          status: res.data?.MasterStatusInvestasi?.name as any,
          userId: res.data?.authorId as string,
          pesan: res.data?.title as string,
          kategoriApp: "INVESTASI",
          title: "Investasi baru",
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

          router.push(NEW_RouterInvestasi.portofolio({ id: "2" }));
          setActiveTab("Review");
          setHotMenu(1);
          setIsLoading(true);
          ComponentGlobal_NotifikasiBerhasil(res.message);
        }
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      clientLogger.error("Error create new investasi", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        my={"xl"}
        style={{
          transition: "0.5s",
        }}
        loaderPosition="center"
        loading={isLoading ? true : false}
        disabled={
          data.title === "" ||
          data.hargaLembar === 0 ||
          data.targetDana === 0 ||
          data.roi === 0 ||
          data.pencarianInvestorId === "" ||
          data.periodeDevidenId === "" ||
          data.pembagianDevidenId === "" ||
          fileImage === null ||
          filePdf === null
            ? true
            : false
        }
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        onClick={() => onCreate()}
      >
        Simpan
      </Button>
    </>
  );
}
