"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { map_funCreatePin } from "../../fun/create/fun_create_pin";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";
import { clientLogger } from "@/util/clientLogger";
import { data } from "autoprefixer";
import { apiCreatePinMap } from "../api_fetch_map";

interface ICreatePinMAp {
  latitude: string;
  longitude: string;
  namePin: string;
  imageId: string;
}
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
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async () => {
    const uploadResult = await funGlobal_UploadToStorage({
      file: file,
      dirId: DIRECTORY_ID.map_image,
    });

    if (!uploadResult.success) {
      setLoading(false);
      ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
    }

    return uploadResult.data.id;
  };

  const handleCreatePin = async (imageId: string) => {
    const newData: ICreatePinMAp = {
      latitude: lat,
      longitude: long,
      namePin: namePin,
      imageId: imageId,
    };

    const respone = await apiCreatePinMap({
      portofolioId: portofolioId,
      data: newData,
    });

    console.log("respone >", respone);

    if (respone && respone.success) {
      ComponentGlobal_NotifikasiBerhasil(respone.message);
      router.back();
    }

    return respone;
  };

  const validateInput = () => {
    if (!namePin || !file) {
      ComponentGlobal_NotifikasiPeringatan(
        "Nama pin dan file gambar harus diisi"
      );
      return false;
    }
    return true;
  };

  const onSavePin = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);

      const imageId = await handleUploadImage();
      const createPinResult = await handleCreatePin(imageId);

      if (!createPinResult.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal membuat pin");
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error create pin", (error as Error).message);
      ComponentGlobal_NotifikasiGagal("Terjadi kesalahan saat menyimpan pin");
    }
  };

  return (
    <>
      <Button
        loading={loading}
        my={"xl"}
        style={{ transition: "0.5s" }}
        disabled={!namePin || !file}
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
