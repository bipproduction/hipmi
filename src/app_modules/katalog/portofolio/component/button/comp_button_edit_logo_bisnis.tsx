"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";
import { portofolio_funEditLogoBisnisById } from "../../fun";
import { clientLogger } from "@/util/clientLogger";

export function ComponentPortofolio_ButtonEditLogoBisnis({
  file,
  portofolioId,
  fileRemoveId,
}: {
  file: File;
  portofolioId: string;
  fileRemoveId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onUpdate() {
    try {
      setLoading(true);

      const deleteLogo = await funGlobal_DeleteFileById({
        fileId: fileRemoveId,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (!deleteLogo.success) {
        setLoading(false);
        clientLogger.error("Error delete logo", deleteLogo.message);
      }

      const uploadFileToStorage = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (!uploadFileToStorage.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }
      const res = await portofolio_funEditLogoBisnisById({
        portofolioId: portofolioId,
        logoId: uploadFileToStorage.data.id,
      });

      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update logo", error);
    }
  }

  return (
    <>
      {file ? (
        <Button
          loaderPosition="center"
          loading={loading}
          radius={"xl"}
          onClick={() => onUpdate()}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          style={{
            transition: "0.5s",
            border: `1px solid ${AccentColor.yellow}`,
          }}
        >
          Simpan
        </Button>
      ) : (
        <Button disabled radius={"xl"}>
          Simpan
        </Button>
      )}
    </>
  );
}
