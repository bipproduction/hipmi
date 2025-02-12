"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Button, Group, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_DetailDataGalangDana from "../../component/detail_galang_dana/detail_data_donasi";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { Donasi_funDeleteDonasiById } from "../../fun/delete/fin_delete_donasi_by_id";
import { Donasi_funGantiStatus } from "../../fun/update/fun_ganti_status";
import { MODEL_DONASI } from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color";

export default function DetailRejectDonasi({
  dataReject,
  fileIdImageCerita,
}: {
  dataReject: MODEL_DONASI;
  fileIdImageCerita: string;
}) {
  const [data, setData] = useState(dataReject);
  return (
    <>
      <Stack spacing={"xl"} pb={"md"}>
        <ComponentGlobal_BoxInformation isReport informasi={data.catatan} />
        <ComponentDonasi_DetailDataGalangDana donasi={data} />
        <ComponentDonasi_CeritaPenggalangMain donasi={data} />
        <ButtonAction
          donasiId={data.id}
          fileIdImageCerita={fileIdImageCerita}
          imageId={data.imageId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  donasiId,
  fileIdImageCerita,
  imageId,
}: {
  donasiId: string;
  fileIdImageCerita: string;
  imageId: string;
}) {
  const router = useRouter();
  const [openModaEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isLoadingEdit, setLoadingEdit] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);

  async function onChangeStatus() {
    await Donasi_funGantiStatus(donasiId, "3").then((res) => {
      if (res.status === 200) {
        setLoadingEdit(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.replace(RouterDonasi.status_galang_dana({ id: "3" }));
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
        setLoadingEdit(true);
      }
    });
  }
  async function onDelete() {
    const del = await Donasi_funDeleteDonasiById(donasiId);
    if (del.status === 200) {
      setLoadingDelete(true);
      const deleteImageDonasi = await funGlobal_DeleteFileById({
        fileId: imageId as any,
      });

      if (!deleteImageDonasi.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
        setLoadingDelete(false);
      }

      const deleteImageCerita = await funGlobal_DeleteFileById({
        fileId: fileIdImageCerita as any,
      });

      if (!deleteImageCerita.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
        setLoadingDelete(false);
      }

      router.replace(RouterDonasi.status_galang_dana({ id: "4" }));
      ComponentGlobal_NotifikasiBerhasil(del.message);
      setLoadingDelete(false);
    } else {
      ComponentGlobal_NotifikasiGagal(del.message);
      setLoadingDelete(false);
    }
  }
  return (
    <>
      <Group grow>
        <Button
          radius={"xl"}
          style={{ backgroundColor: AccentColor.yellow}}
          c={MainColor.darkblue}
          onClick={() => setOpenModalEdit(true)}
        >
          Edit Kembali
        </Button>
        <Button
          radius={"xl"}
          style={{ backgroundColor: MainColor.red }}
          c={AccentColor.white}
          onClick={() => setOpenModalDelete(true)}
        >
          Hapus Donasi
        </Button>
      </Group>

      {/* MODAL EDIT */}
      <UIGlobal_Modal
        title={"Anda yakin ingin mengedit donasi ini ?"}
        opened={openModaEdit}
        close={() => setOpenModalEdit(false)}
        buttonKiri={
          <Button style={{ backgroundColor: AccentColor.blue }}
          c={AccentColor.white} radius={"xl"} onClick={() => setOpenModalEdit(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingEdit}
            style={{ backgroundColor: AccentColor.yellow }}
            radius={"xl"}
            c={MainColor.darkblue}
            onClick={() => onChangeStatus()}
          >
            Edit
          </Button>
        }
      />

      {/* HAPUS */}
      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus donasi ini ?"}
        opened={openModalDelete}
        close={() => setOpenModalDelete(false)}
        buttonKiri={
          <Button style={{ backgroundColor: AccentColor.blue }}
          c={AccentColor.white} radius={"xl"} onClick={() => setOpenModalDelete(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingDelete}
            radius={"xl"}
            style={{ backgroundColor: MainColor.red }}
            c={AccentColor.white}
            onClick={() => onDelete()}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
