"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";

import { DIRECTORY_ID } from "@/lib";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { clientLogger } from "@/util/clientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { map_funEditMap } from "../../fun/edit/fun_edit_map";
import { MODEL_MAP } from "../../lib/interface";

export function ComponentMap_ButtonUpdateDataMap({
  data,
  file,
}: {
  data: MODEL_MAP;
  file: File;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function onSavePin() {
    try {
      setIsLoading(true);

      if (file !== null) {
        const uploadFileToStorage = await funGlobal_UploadToStorage({
          file: file,
          dirId: DIRECTORY_ID.map_image,
        });

        if (!uploadFileToStorage.success) {
          setIsLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
          return;
        }

        const deleteLogo = await funGlobal_DeleteFileById({
          fileId: data.imageId,
          dirId: DIRECTORY_ID.map_image,
        });

        if (!deleteLogo.success) {
          setIsLoading(false);
          clientLogger.error("Error delete logo", deleteLogo.message);
        }

        const res = await map_funEditMap({
          data: data,
          fileId: uploadFileToStorage.data.id,
        });

        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } else {
        const res = await map_funEditMap({
          data: data,
        });

        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error update logo", error);
    }
  }

  return (
    <>
      <Button
        loaderPosition="center"
        loading={isLoading}
        mb={"xl"}
        style={{ transition: "0.5s" }}
        disabled={data.namePin === "" || file === null}
        radius={"xl"}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        onClick={() => onSavePin()}
      >
        Simpan
      </Button>
    </>
  );
}
