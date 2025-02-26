"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Box, Button } from "@mantine/core";

import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/lib";
import { clientLogger } from "@/util/clientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiUpdateLogoPortofolioById } from "../api_fetch_portofolio";

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

      const uploadFileToStorage = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (!uploadFileToStorage.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      const deleteLogo = await funGlobal_DeleteFileById({
        fileId: fileRemoveId,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (!deleteLogo.success) {
        setLoading(false);
        clientLogger.error("Error delete logo", deleteLogo.message);
      }

      const logoId = uploadFileToStorage.data.id;

      const response = await apiUpdateLogoPortofolioById({
        id: portofolioId,
        data: logoId,
      });

      if (!response) {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal("Gagal update logo");
        return;
      }

      ComponentGlobal_NotifikasiBerhasil("Berhasil mengubah Logo Bisnis!");
      router.back();
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update logo", error);
    }
  }

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={file === null}
          loaderPosition="center"
          loading={loading}
          radius={"xl"}
          onClick={() => onUpdate()}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          style={{
            width: "90%",
            transition: "0.5s",
            position: "absolute",
            bottom: 20,
          }}
        >
          Simpan
        </Button>
      </Box>
    </>
  );
}
