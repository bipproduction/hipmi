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

export default function DetailRejectInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [investasi, setInvestasi] = useState(dataInvestasi);
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
  const [openModal, setOpenModal] = useState(false);

  async function onAjukan() {
    const res = await investasi_funEditStatusById({
      investasiId: dataInvestasi.id,
      statusId: "3",
    });

    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil("Project Diajukan Kembali");
      setActiveTab("Draft");
      router.push(RouterInvestasi_OLD.portofolio);
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal Pengajuan");
    }
  }

  async function onDelete() {
    await funDeleteInvestasi(investasi.id).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setOpenModal(false);
        router.push(RouterInvestasi_OLD.portofolio);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
    // setActiveTab("Reject");
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
          <Button bg={"red"} radius={"xl"} onClick={() => onDelete()}>
            Hapus
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
            onClick={() => onAjukan()}
          >
            Edit Kembali
          </Button>

          {/* Tombol Hapus */}
          <Button
            mb={"xl"}
            radius={50}
            bg={"red.7"}
            color="yellow"
            onClick={() => setOpenModal(true)}
          >
            Hapus
          </Button>
        </Group>
      </Stack>
    </>
  );
}
