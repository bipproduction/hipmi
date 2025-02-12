"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Box, Button } from "@mantine/core";

import { DIRECTORY_ID } from "@/lib";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { clientLogger } from "@/util/clientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { portofolio_funEditLogoBisnisById } from "../../fun";

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
      const res = await portofolio_funEditLogoBisnisById({
        portofolioId: portofolioId,
        logoId: logoId,
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
      <Box
        p={"xs"}
        bg={"red"}
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
            width: "100%",
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
