"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { map_funCreatePin } from "../../fun/create/fun_create_pin";

export function ComponentMap_ButtonSavePin({
  namePin,
  lat,
  long,
  portofolioId,
  imageId,
}: {
  namePin: string;
  lat: string;
  long: string;
  portofolioId: string;
  imageId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSavePin() {
    try {
      setLoading(true);

      const res = await map_funCreatePin({
        data: {
          latitude: lat as any,
          longitude: long as any,
          namePin: namePin as any,
          imageId: imageId,
          Portofolio: {
            create: { id: portofolioId } as any,
          },
        },
      });
      res.status === 200
        ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
        : ComponentGlobal_NotifikasiGagal(res.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        loading={loading}
        my={"xl"}
        style={{ transition: "0.5s" }}
        disabled={namePin === "" || imageId == "" ? true : false}
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
