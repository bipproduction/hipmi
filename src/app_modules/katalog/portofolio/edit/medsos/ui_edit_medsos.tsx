"use client";

import ComponentKatalog_NotedBox from "@/app_modules/katalog/component/noted_box";
import { Box, Button, Paper, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { MODEL_PORTOFOLIO_MEDSOS } from "../../model/interface";
import { Portofolio_funEditMedsosById } from "../../fun/edit/fun_edit_medsos_bisnis_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function Portofolio_EditMedsosBisnis({
  dataMedsos,
}: {
  dataMedsos: MODEL_PORTOFOLIO_MEDSOS;
}) {
  const router = useRouter();
  const [medsos, setMedsos] = useState(dataMedsos);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* <pre>{JSON.stringify(dataMedsos, null, 2)}</pre> */}
      <Paper
        p={"sm"}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: MainColor.white,
        }}
      >
        <Stack px={"sm"}>
          <TextInput
            styles={{
              label: {
                color: MainColor.white
              },
              input: {
                backgroundColor: MainColor.white
              },
              required: {
                color: MainColor.red
              }
            }}
            label="Facebook"
            value={medsos.facebook}
            placeholder="Facebook"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                facebook: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white
              },
              input: {
                backgroundColor: MainColor.white
              },
              required: {
                color: MainColor.red
              }
            }}
            label="Instagram"
            value={medsos.instagram}
            placeholder="Instagram"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                instagram: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white
              },
              input: {
                backgroundColor: MainColor.white
              },
              required: {
                color: MainColor.red
              }
            }}
            label="Tiktok"
            value={medsos.tiktok}
            placeholder="Tiktok"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                tiktok: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white
              },
              input: {
                backgroundColor: MainColor.white
              },
              required: {
                color: MainColor.red
              }
            }}
            label="Twitter"
            value={medsos.twitter}
            placeholder="Twitter"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                twitter: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: MainColor.white
              },
              input: {
                backgroundColor: MainColor.white
              },
              required: {
                color: MainColor.red
              }
            }}
            label="Youtube"
            value={medsos.youtube}
            placeholder="Youtube"
            onChange={(val) => {
              setMedsos({
                ...medsos,
                youtube: val.target.value,
              });
            }}
          />

          <Button
            mt={"xl"}
            radius={"xl"}
            loading={loading ? true : false}
            loaderPosition="center"
            onClick={() => onUpdate(router, medsos, setLoading)}
            style={{
              backgroundColor: MainColor.yellow,
              border: `2px solid ${AccentColor.yellow}`,
              transition: "0.5s",
              color: "black",
            }}
          >
            Update
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  medsos: MODEL_PORTOFOLIO_MEDSOS,
  setLoading: any
) {
  await Portofolio_funEditMedsosById(medsos).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
