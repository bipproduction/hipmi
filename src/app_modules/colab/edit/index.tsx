"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import colab_funEditById from "../fun/edit/fun_edit_by_id";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_MASTER,
} from "../model/interface";

export default function Colab_Edit({
  selectedData,
  listIndustri,
}: {
  selectedData: MODEL_COLLABORATION;
  listIndustri: MODEL_COLLABORATION_MASTER[];
}) {
  const [value, setValue] = useState(selectedData);
  return (
    <>
      <Stack px={"xl"} py={"md"}>
        {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
        <TextInput
          maxLength={100}
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
            required: {
              color: MainColor.red,
            }
          }}
          label="Judul"
          withAsterisk
          placeholder="Masukan judul proyek"
          value={value.title}
          onChange={(val) =>
            setValue({
              ...value,
              title: val.currentTarget.value,
            })
          }
        />

        <TextInput
          maxLength={100}
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
            required: {
              color: MainColor.red,
            }
          }}
          label="Lokasi"
          withAsterisk
          placeholder="Masukan lokasi proyek"
          value={value.lokasi}
          onChange={(val) =>
            setValue({
              ...value,
              lokasi: val.currentTarget.value,
            })
          }
        />

        <Select
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            dropdown: {
              backgroundColor: MainColor.white,
            }
          }}
          placeholder="Pilih kategori industri"
          label="Pilih Industri"
          withAsterisk
          value={value?.ProjectCollaborationMaster_Industri.id}
          data={listIndustri.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={
            (val) =>
              setValue({
                ...(value as any),
                ProjectCollaborationMaster_Industri: {
                  id: val as any,
                },
              })
            // console.log(val)
          }
        />

        {/* <TextInput
          description={
            <Text fz={10}>
              minimal partisipan yang akan di pilih untuk mendiskusikan proyek
            </Text>
          }
          type="number"
          withAsterisk
          label="Jumlah Partisipan"
          placeholder={"2"}
          value={value.jumlah_partisipan ? value.jumlah_partisipan : ""}
          onChange={(val) => {
            setValue({
              ...value,
              jumlah_partisipan: + val.currentTarget.value
            });
          }}
        /> */}

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              }
            }}
            label="Tujuan Proyek"
            placeholder="Masukan tujuan proyek"
            withAsterisk
            minRows={5}
            value={value.purpose}
            onChange={(val) =>
              setValue({
                ...value,
                purpose: val.currentTarget.value,
              })
            }
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.purpose.length}
            maxInput={500}
          />
        </Stack>

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
            }}
            label="Keuntungan "
            placeholder="Masukan keuntungan dalam proyek"
            minRows={5}
            value={value.benefit}
            onChange={(val) =>
              setValue({
                ...value,
                benefit: val.currentTarget.value,
              })
            }
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.benefit.length}
            maxInput={500}
          />
        </Stack>

        <ButtonAction value={value as any} />
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    if (value.title === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.lokasi === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.purpose === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.projectCollaborationMaster_IndustriId === 0)
      return ComponentGlobal_NotifikasiPeringatan("Pilih Industri");
    // if (value.jumlah_partisipan < 2)
    //   return ComponentGlobal_NotifikasiPeringatan("Minimal Ada 2 Partisipan");

    await colab_funEditById(value as any).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        router.back();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Button
        disabled={
          !value.title ||
          !value.lokasi ||
          !value.purpose ||
          !value.benefit ||
          value.projectCollaborationMaster_IndustriId === 0
            ? true
            : false
        }
        loaderPosition="center"
        loading={loading ? true : false}
        mt={"xl"}
        radius={"xl"}
        onClick={() => onUpdate()}
        bg={MainColor.yellow}
        color={"yellow"}
        c={"black"}
        style={{
          transition: "0.5s",
        }}
      >
        Update
      </Button>
    </>
  );
}
