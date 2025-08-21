"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Button, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Donasi_funUpdateRekening } from "../../fun/update/fun_update_rekening";
import { apiGetOneDonasiById } from "../../lib/api_donasi";
import { MODEL_DONASI } from "../../model/interface";

export default function Donasi_EditRekening() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<MODEL_DONASI | null>(null);
  const [isLoading, setLoading] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneDonasiById(id as string, "semua");

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error get data donasi", error);
    }
  }

  if (!data) return <CustomSkeleton height={300} />;

  return (
    <>
      <Stack spacing={"xl"}>
        <Stack spacing={"sm"}>
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Nama Bank"
            placeholder="Masukan Nama Bank"
            value={data.namaBank}
            error={
              data.namaBank === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nama bank" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setData({
                ...data,
                namaBank: _.upperCase(val.target.value),
              })
            }
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            type="number"
            label="Nomor Rekening"
            placeholder="Masukkan Nomor Rekening"
            value={data.rekening}
            error={
              data.rekening === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nomor rekening" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setData({
                ...data,
                rekening: val.currentTarget.value,
              })
            }
          />
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          loaderPosition="center"
          loading={isLoading ? true : false}
          disabled={data.namaBank === "" || data.rekening === "" ? true : false}
          radius={"xl"}
          onClick={() => onUpdate(router, data, setLoading)}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  donasi: MODEL_DONASI,
  setLoading: any
) {
  await Donasi_funUpdateRekening(donasi).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      router.back();
      ComponentGlobal_NotifikasiBerhasil(res.message);
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
