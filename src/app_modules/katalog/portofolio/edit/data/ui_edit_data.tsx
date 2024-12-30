"use client";

import {
  MainColor
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Button, Select, Stack, TextInput, Textarea } from "@mantine/core";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Portofolio_funEditDataBisnis } from "../../fun/edit/fun_edit_data_bisnis_by_id";
import {
  MODEL_PORTOFOLIO,
  MODEL_PORTOFOLIO_BIDANG_BISNIS,
} from "../../model/interface";

export default function Portofolio_EditDataBisnis({
  dataPorto,
  listBidang,
}: {
  dataPorto: MODEL_PORTOFOLIO;
  listBidang: MODEL_PORTOFOLIO_BIDANG_BISNIS[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(dataPorto);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* <pre>{JSON.stringify(porto, null, 2)}</pre> */}
      <Stack spacing={50} p={"sm"}>
        <Stack>
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
            withAsterisk
            value={value.namaBisnis}
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            maxLength={100}
            error={
              value.namaBisnis === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nama bisnis" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                namaBisnis: val.target.value,
              });
            }}
          />
          <Select
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
            withAsterisk
            value={value.MasterBidangBisnis.id}
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={listBidang.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setValue({
                ...(value as any),
                MasterBidangBisnis: {
                  id: val,
                },
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
            withAsterisk
            value={value.alamatKantor}
            label="Alamat Kantor"
            placeholder="Alamat kantor"
            maxLength={100}
            error={
              value.alamatKantor === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan alamat kantor" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                alamatKantor: val.target.value,
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
            withAsterisk
            value={value.tlpn}
            label="Nomor Telepon Kantor"
            placeholder="Nomor telepon kantor"
            type="number"
            maxLength={15}
            error={
              value.tlpn === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan nomor telepon kantor" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                tlpn: val.target.value,
              });
            }}
          />
          <Stack spacing={5}>
            <Textarea
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
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              value={value.deskripsi}
              label="Deskripsi"
              placeholder="Deskripsi singkat mengenai usaha"
              maxLength={300}
              error={
                value.deskripsi === "" ? (
                  <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
                ) : (
                  ""
                )
              }
              onChange={(val) => {
                setValue({
                  ...value,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={value.deskripsi.length}
            />
          </Stack>
        </Stack>
        <Button
          disabled={_.values(value).includes("") ? true : false}
          radius={"xl"}
          loading={loading ? true : false}
          loaderPosition="center"
          onClick={() => {
            onUpdate(router, value as any, setLoading);
          }}
          bg={MainColor.yellow}
          color={"yellow"}
          c={"black"}
          style={{
            transition: "0.5s",
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  data: MODEL_PORTOFOLIO,
  setLoading: any
) {
  if (_.values(data).includes("")) {
    return null;
  }

  // if (data.namaBisnis.length > 100) return null;
  // if (data.alamatKantor.length > 100) return null;
  // if (data.deskripsi.length > 150) return null;

  await Portofolio_funEditDataBisnis(data).then((res) => {
    if (res.status === 200) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}
