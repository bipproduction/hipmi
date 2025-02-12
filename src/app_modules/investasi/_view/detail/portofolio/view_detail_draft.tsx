"use client";

import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_peringatan";
import { Investasi_ComponentDetailDataNonPublish } from "@/app_modules/investasi/_component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { investasi_funEditStatusById } from "@/app_modules/investasi/fun/edit/fun_edit_status_by_id";
import funDeleteInvestasi from "@/app_modules/investasi/fun/fun_delete_investasi";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import { Button, Group, Stack } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Investasi_ViewDetailDraft({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI>(dataInvestasi);
  const [openModal, setOpenModal] = useState(false);

  // Delete
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  async function onChangeStatus() {
    const res = await investasi_funEditStatusById({
      investasiId: data.id,
      statusId: "2",
    });

    try {
      setIsLoading(true);
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil("Review Berhasil Diajukan");
        router.replace(NEW_RouterInvestasi.portofolio({ id: "2" }));
  
        const dataNotif = {
          appId: res.data?.id,
          userId: res.data?.authorId,
          pesan: res.data?.title,
          status: res.data?.MasterStatusInvestasi?.name,
          kategoriApp: "INVESTASI",
          title: "Mengajukan review",
        };
  
        const notif = await notifikasiToAdmin_funCreate({
          data: dataNotif as any,
        });
  
        if (notif.status === 201) {
          mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
        }
      } else {
        setIsLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error update investasi", error);
    }
  }

  async function onDelete() {
    const res = await funDeleteInvestasi(data.id);
    try {
      setIsLoadingDelete(true);
      if (res.status === 200) {
  
        const delImage = await funGlobal_DeleteFileById({
          fileId: data.imageId,
        });
        if (!delImage.success) {
          ComponentAdminGlobal_NotifikasiPeringatan("Gagal hapus image ");
        }
  
        const delFileProspektus = await funGlobal_DeleteFileById({
          fileId: data.prospektusFileId,
        });
        if (!delFileProspektus.success) {
          ComponentAdminGlobal_NotifikasiPeringatan("Gagal hapus prospektus ");
        }
  
        if (!_.isEmpty(data.DokumenInvestasi)) {
          for (let i of data.DokumenInvestasi) {
            const delFileDokumen = await funGlobal_DeleteFileById({
              fileId: i.fileId,
            });
  
            if (!delFileDokumen.success) {
              ComponentAdminGlobal_NotifikasiPeringatan(
                "Gagal hapus prospektus "
              );
            }
          }
        }
  
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setOpenModal(false);
        router.replace(NEW_RouterInvestasi.portofolio({ id: "3" }));
        setIsLoadingDelete(false);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
        setIsLoadingDelete(false);
      }
    } catch (error) {
      setIsLoadingDelete(false);
      clientLogger.error("Error delete investasi", error);
    }
  }

  return (
    <>
      <Stack mb={"lg"}>
        {data.catatan && (
          <ComponentGlobal_BoxInformation informasi={data.catatan} isReport />
        )}
        <Investasi_ComponentDetailDataNonPublish data={data} />

        <Group position="apart" grow>
          <Button
            radius={50}
            style={{ backgroundColor: AccentColor.yellow}}
            c={MainColor.darkblue}
            onClick={() => setOpenModal(true)}
          >
            Ajukan Review
          </Button>

          <Button
            radius={50}
            style={{ backgroundColor: MainColor.red}}
            c={AccentColor.white}
            onClick={() => setOpenModalDelete(true)}
          >
            Hapus
          </Button>
        </Group>
      </Stack>

      {/* Ajukan Kembali */}
      <UIGlobal_Modal
        opened={openModal}
        close={() => setOpenModal(false)}
        title={"Anda yakin ingin mengajukan review ?"}
        buttonKiri={
          <Button style={{ backgroundColor: AccentColor.blue }}
          c={AccentColor.white} radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{
              transition: "0.5s", color: "black",
              backgroundColor: AccentColor.yellow,
            }}
            loaderPosition="center"
            loading={isLoading}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => onChangeStatus()}
          >
            Simpan
          </Button>
        }
      />

      {/* Hapus */}
      <UIGlobal_Modal
        opened={openModalDelete}
        close={() => setOpenModalDelete(false)}
        title={"Anda yakin ingin menghapus ?"}
        buttonKiri={
          <Button style={{ backgroundColor: AccentColor.blue }}
          c={AccentColor.white}  radius={"xl"} onClick={() => setOpenModalDelete(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            style={{
              transition: "0.5s",
              backgroundColor: MainColor.red
            }}
            loaderPosition="center"
            loading={isLoadingDelete}
            radius={"xl"}
            c={AccentColor.white}
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
