"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import { Button, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Collaboration_SkeletonCreate } from "../component";
import { apiGetMasterCollaboration } from "../component/lib/api_collaboration";
import colab_funCreateProyek from "../fun/create/fun_create_proyek";
import { MODEL_COLLABORATION_MASTER } from "../model/interface";

export default function Colab_Create() {
  const [value, setValue] = useState({
    title: "",
    lokasi: "",
    purpose: "",
    benefit: "",
    projectCollaborationMaster_IndustriId: 0,
    // jumlah_partisipan: 0,
  });

  const [listIndustri, setListIndustri] = useState<
    MODEL_COLLABORATION_MASTER[] | null
  >(null);

  useShallowEffect(() => {
    onLoadMaster();
  }, []);

  async function onLoadMaster() {
    try {
      const respone = await apiGetMasterCollaboration();
      if (respone.success) {
        setListIndustri(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get master collaboration", error);
    }
  }

  if (listIndustri == null) {
    return (
      <>
        <Collaboration_SkeletonCreate />
      </>
    );
  }

  return (
    <>
      <Stack px={"xl"} pb={"md"}>
        <TextInput
          maxLength={100}
          styles={{
            label: { color: MainColor.white },
            input: { backgroundColor: MainColor.white },
            required: { color: MainColor.red },
          }}
          label="Judul"
          withAsterisk
          placeholder="Masukan judul proyek"
          onChange={(val) => {
            setValue({
              ...value,
              title: val.currentTarget.value,
            });
          }}
        />

        <TextInput
          styles={{
            label: { color: MainColor.white },
            input: { backgroundColor: MainColor.white },
            required: { color: MainColor.red },
          }}
          maxLength={100}
          label="Lokasi"
          withAsterisk
          placeholder="Masukan lokasi proyek"
          onChange={(val) => {
            setValue({
              ...value,
              lokasi: val.currentTarget.value,
            });
          }}
        />

        <Select
          styles={{
            label: { color: MainColor.white },
            input: { backgroundColor: MainColor.white },
            required: { color: MainColor.red },
            dropdown: { backgroundColor: MainColor.white },
          }}
          placeholder="Pilih kategori industri"
          label="Pilih Industri"
          withAsterisk
          data={listIndustri.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val) => {
            setValue({
              ...value,
              projectCollaborationMaster_IndustriId: val as any,
            });
          }}
        />

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: { color: MainColor.white },
              input: { backgroundColor: MainColor.white },
              required: { color: MainColor.red },
            }}
            maxLength={500}
            label="Tujuan Proyek"
            placeholder="Masukan tujuan proyek"
            withAsterisk
            minRows={5}
            onChange={(val) => {
              setValue({
                ...value,
                purpose: val.currentTarget.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.purpose.length}
            maxInput={500}
          />
        </Stack>

        <Stack spacing={5}>
          <Textarea
            styles={{
              label: { color: MainColor.white },
              input: { backgroundColor: MainColor.white },
            }}
            maxLength={500}
            label="Keuntungan "
            placeholder="Masukan keuntungan dalam proyek"
            minRows={5}
            onChange={(val) => {
              setValue({
                ...value,
                benefit: val.currentTarget.value,
              });
            }}
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

  async function onSave() {
    mqtt_client.publish(
      "Colab_create",
      JSON.stringify({ isNewPost: true, count: 1 })
    );

    if (value.title === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.lokasi === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.purpose === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (value.projectCollaborationMaster_IndustriId === 0)
      return ComponentGlobal_NotifikasiPeringatan("Pilih Industri");

    try {
      setLoading(true);

      const res = await colab_funCreateProyek(value);
      if (res.status === 201) {
        router.back();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error create proyek", error);
    }
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
        onClick={() => {
          onSave();
        }}
        bg={MainColor.yellow}
        color={"yellow"}
        c={"black"}
        style={{
          transition: "0.5s",
        }}
      >
        Simpan
      </Button>
    </>
  );
}
