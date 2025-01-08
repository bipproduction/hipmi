"use client";

import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_peringatan";
import { Investasi_ComponentDetailDataNonPublish } from "@/app_modules/investasi/_component";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { investasi_funEditStatusById } from "@/app_modules/investasi/fun/edit/fun_edit_status_by_id";
import funDeleteInvestasi from "@/app_modules/investasi/fun/fun_delete_investasi";
import { Button, Group, Stack } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Investasi_ViewDetailReject({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataInvestasi);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function onAjukan() {
    const res = await investasi_funEditStatusById({
      investasiId: data.id,
      statusId: "3",
    });

    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil("Project Diajukan Kembali");
      router.replace(NEW_RouterInvestasi.portofolio({ id: "3" }));
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal Pengajuan");
    }
  }

  async function onDelete() {
    const res = await funDeleteInvestasi(data.id);
    if (res.status === 200) {
      setLoading(true);

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
      router.replace(NEW_RouterInvestasi.portofolio({ id: "4" }));
      setLoading(false);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
      setLoading(false);
    }
  }

  return (
    <>
      {/* Pop up */}
      <UIGlobal_Modal
        title={"Anda Yakin Menghapus Data?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading}
            color="red"
            bg={"red"}
            radius={"xl"}
            onClick={() => onDelete()}
          >
            Hapus
          </Button>
        }
      />

      <Stack>
        {/* Alasan */}
        <ComponentGlobal_BoxInformation informasi={data.catatan} isReport />

        <Investasi_ComponentDetailDataNonPublish data={dataInvestasi} />

        <Group position="apart" grow mb={"xl"}>
          {/* Tombol Ajukan */}
          <Button
            radius={"xl"}
            style={{ backgroundColor: AccentColor.yellow }}
            onClick={() => onAjukan()}
            c={MainColor.darkblue}
          >
            Edit Kembali
          </Button>

          {/* Tombol Hapus */}
          <Button
            radius={"xl"}
            style={{ backgroundColor: MainColor.red }}
            c={AccentColor.white}
            onClick={() => setOpenModal(true)}
          >
            Hapus
          </Button>
        </Group>
      </Stack>
    </>
  );
}
