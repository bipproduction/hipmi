import { Button } from "@mantine/core";
import { Donasi_funDeleteDonasiById } from "../../fun/delete/fin_delete_donasi_by_id";
import { useState } from "react";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiPeringatan,
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";

import { useAtom } from "jotai";
import { gs_donasi_tabs_posting } from "../../global_state";
import { useRouter } from "next/navigation";

export function Donasi_ComponentButtonDeleteDonasiById({
  donasiId,
  imageCeritaId,
  imageId,
}: {
  donasiId: string;
  imageCeritaId: string;
  imageId: string;
}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  async function onDelete() {
    const del = await Donasi_funDeleteDonasiById(donasiId);
    if (del.status === 200) {
      const deleteImageDonasi = await funGlobal_DeleteFileById({
        fileId: imageId as any,
      });

      if (!deleteImageDonasi.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
      }

      const deleteImageCerita = await funGlobal_DeleteFileById({
        fileId: imageCeritaId as any,
      });

      if (!deleteImageCerita.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
      }

      router.replace(RouterDonasi.status_galang_dana({ id: "3" }));
      setTabsPostingDonasi("Draft");
      ComponentGlobal_NotifikasiBerhasil(del.message);
    } else {
      ComponentGlobal_NotifikasiGagal(del.message);
    }
  }

  return (
    <>
      <Button
        radius={"xl"}
        color="red"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Hapus Donasi
      </Button>

      <UIGlobal_Modal
        title={"Anda yakin ingin menghapus donasi ini ?"}
        opened={openModal}
        close={() => setOpenModal(false)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button radius={"xl"} color="red" onClick={() => onDelete()}>
            Hapus
          </Button>
        }
      />
    </>
  );
}
