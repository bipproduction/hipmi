"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Collaboration_SkeletonCreate } from "../component";
import { apiGetMasterCollaboration } from "../component/lib/api_collaboration";
import colab_funCreateProyek from "../fun/create/fun_create_proyek";
import { MODEL_COLLABORATION_MASTER } from "../model/interface";

interface IValue {
  title: string;
  lokasi: string;
  purpose: string;
  benefit: string;
  projectCollaborationMaster_IndustriId: number;
}

export default function Colab_Create() {
  const [value, setValue] = useState<IValue>({
    title: "",
    lokasi: "",
    purpose: "",
    benefit: "",
    projectCollaborationMaster_IndustriId: 0,
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
      <Stack px={"xs"} pb={"md"}>
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
          <Component_V3_Label_TextInput text="Tujuan Proyek" />

          <Component_V3_TextEditor
            data={value.purpose}
            onSetData={(val) => {
              setValue({
                ...value,
                purpose: val,
              });
            }}
          />

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: value.purpose }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        <Stack spacing={5}>
          <Component_V3_Label_TextInput text="Keuntungan" />

          <Component_V3_TextEditor
            data={value.benefit}
            onSetData={(val) => {
              setValue({
                ...value,
                benefit: val,
              });
            }}
          />

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: value.benefit }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        {/* <Stack spacing={5}>
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
        </Stack> */}

        {/* <Stack spacing={5}>
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
        </Stack> */}

        <ButtonAction value={value as any} />
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: IValue }) {
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

      const res = await colab_funCreateProyek(value as any);
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
          value.projectCollaborationMaster_IndustriId === 0 ||
          // value.purpose
          // value.benefit
          funReplaceHtml({ html: value.purpose }).length > maxInputLength ||
          funReplaceHtml({ html: value.purpose }).length === 0 ||
          funReplaceHtml({ html: value.benefit }).length > maxInputLength ||
          funReplaceHtml({ html: value.benefit }).length === 0
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
