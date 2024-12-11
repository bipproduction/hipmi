"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { map_funCreatePin } from "../../fun/create/fun_create_pin";
import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { useState } from "react";

export function ComponentMap_ButtonSavePin({
  namePin,
  lat,
  long,
  portofolioId,
  file,
}: {
  namePin: string;
  lat: string;
  long: string;
  portofolioId: string;
  file: File;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  async function onSavePin() {
    setLoading(true)
    const uploadFileToStorage = await funGlobal_UploadToStorage({
      file: file,
      dirId: DIRECTORY_ID.map_image,
    });

    if (!uploadFileToStorage.success)
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

    const res = await map_funCreatePin({
      data: {
        latitude: lat as any,
        longitude: long as any,
        namePin: namePin as any,
        imageId: uploadFileToStorage.data.id,
        Portofolio: {
          create: { id: portofolioId } as any,
        },
      },
    });
    res.status === 200
      ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
      : ComponentGlobal_NotifikasiGagal(res.message);

    setLoading(false)
  }

  return (
    <>
      <Button
        loading={loading}
        my={"xl"}
        style={{ transition: "0.5s" }}
        disabled={namePin === "" || file === null ? true : false}
        radius={"xl"}
        loaderPosition="center"
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
