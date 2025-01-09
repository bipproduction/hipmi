"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Button, Group, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { ComponentInvestasi_DetailDataNonPublish } from "../../component/detail/x_detai_data_non_publish";
import { investasi_funEditStatusById } from "../../fun/edit/fun_edit_status_by_id";
import funDeleteInvestasi from "../../fun/fun_delete_investasi";
import { gs_investasi_status } from "../../g_state";
import { clientLogger } from "@/util/clientLogger";
import { AccentColor } from "@/app_modules/_global/color";

export default function DetailRejectInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  async function onAjukan() {
    const res = await investasi_funEditStatusById({
      investasiId: dataInvestasi.id,
      statusId: "3",
    });

    try {
      setLoading(true);
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil("Project Diajukan Kembali");
        setOpenModal2(false);
        router.push(RouterInvestasi_OLD.portofolio);
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal("Gagal Pengajuan");
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error ajukan kembali", error);
    }
  }

  async function onDelete() {
    await funDeleteInvestasi(investasi.id).then((res) => {
      try {
        setLoading2(true);
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          setOpenModal1(false);
          router.push(RouterInvestasi_OLD.portofolio);
        } else {
          setLoading2(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } catch (error) {
        setLoading2(false);
        clientLogger.error("Error delete investasi", error);
      }
    });
    // setActiveTab("Reject");
  }

  return (
    <>
      {/* Pop up */}

      <UIGlobal_Modal
        title={"Anda Yakin Menghapus Data?"}
        opened={openModal1}
        close={() => setOpenModal1(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal1(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            bg={"red"}
            loading={isLoading2 ? true : false}
            loaderPosition="center"
            radius={"xl"}
            onClick={() => onDelete()}>
            Hapus
          </Button>
        }
      />

      <UIGlobal_Modal
        title={"Anda Yakin Mengajukan Kembali?"}
        opened={openModal2}
        close={() => setOpenModal2(false)}
        buttonKiri={
          <Button
            radius={"xl"}
            onClick={() => setOpenModal2(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loading={isLoading ? true : false}
            loaderPosition="center"
            bg={AccentColor.yellow}
            radius={"xl"}
            onClick={() => onAjukan()}>
            Ajukan
          </Button>
        }
      />

      <Stack>
        {/* Alasan */}
        <ComponentGlobal_BoxInformation
          informasi={investasi.catatan}
          isReport
        />

        <ComponentInvestasi_DetailDataNonPublish data={investasi} />

        <Group position="apart" grow>
          {/* Tombol Ajukan */}
          <Button
            mb={"xl"}
            radius={50}
            bg={"orange.7"}
            color="yellow"
            onClick={() => setOpenModal2(true)}
          >
            Edit Kembali
          </Button>


          {/* Tombol Hapus */}
          <Button
            mb={"xl"}
            radius={50}
            bg={"red.7"}
            color="yellow"
            onClick={() => setOpenModal1(true)}
          >
            Hapus
          </Button>
        </Group>
      </Stack>
    </>
  );
}
