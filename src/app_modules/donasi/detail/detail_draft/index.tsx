"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { IRealtimeData } from "@/lib/global_state";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Donasi_ComponentButtonDeleteDonasiById } from "../../component";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { MODEL_DONASI } from "../../model/interface";
import { apiGetOneDonasiById } from "../../lib/api_donasi";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function DetailDraftDonasi() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState({} as MODEL_DONASI);
  const [loading, setLoading] = useState(true);

  useShallowEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const response = await apiGetOneDonasiById(param.id, "semua");

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <CustomSkeleton height={400} />;
  }

  return (
    <>
      <Stack spacing={"xl"} py={"md"}>
        <ComponentDonasi_DetailDataGalangDana donasi={data} />
        <ComponentDonasi_CeritaPenggalangMain donasi={data} />
        <Group position="apart" grow mt={"lg"}>
          <ButtonAjukanPenggalangan dataDonasi={data} />
          <Donasi_ComponentButtonDeleteDonasiById
            donasiId={data.id}
            imageCeritaId={data.CeritaDonasi.imageId}
            imageId={data.imageId}
          />
        </Group>
      </Stack>
    </>
  );
}

function ButtonAjukanPenggalangan({
  dataDonasi,
}: {
  dataDonasi: MODEL_DONASI;
}) {
  const router = useRouter();
  const [isLoadingAjukan, setLoadingAjukan] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  async function onChangeStatus() {
    setLoadingAjukan(true);
    const res = await Donasi_funGantiStatus(dataDonasi.id, "2");
    try {
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.DonasiMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "DONASI",
          title: "Mengajukan review",
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

          ComponentGlobal_NotifikasiBerhasil("Berhasil Diajukan");
          router.replace(RouterDonasi.status_galang_dana({ id: "2" }));
        }
      } else {
        setLoadingAjukan(false);
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    } catch (error) {
      setLoadingAjukan(false);
      clientLogger.error("Error ajukan donasi", error);
    }
  }
  return (
    <>
      <Button
        radius={"xl"}
        style={{
          backgroundColor: AccentColor.yellow,
        }}
        c={MainColor.darkblue}
        onClick={() => setOpenModal(true)}
      >
        Ajukan Kembali
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin ingin mengajukan kembali ?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button
            style={{ backgroundColor: AccentColor.blue }}
            c={AccentColor.white}
            radius={"xl"}
            onClick={() => setOpenModal(false)}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{
              backgroundColor: AccentColor.yellow,
            }}
            loaderPosition="center"
            loading={isLoadingAjukan}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => onChangeStatus()}
          >
            Ajukan
          </Button>
        }
      />
    </>
  );
}
