"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import colab_funEditById from "../fun/edit/fun_edit_by_id";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_MASTER,
} from "../model/interface";
import { clientLogger } from "@/util/clientLogger";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { useShallowEffect } from "@mantine/hooks";
import {
  apiGetMasterIndustri,
  apiGetOneCollaborationById,
} from "../_lib/api_collaboration";
import _ from "lodash";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function Colab_Edit() {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_COLLABORATION | any | null>();
  const [listIndustri, setListIndustri] = useState<
    MODEL_COLLABORATION_MASTER[] | null
  >(null);

  useShallowEffect(() => {
    onLoadIndustri();
  }, []);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetOneCollaborationById({
        id: id as string,
        kategori: "detail",
      });
      if (response.success) {
        const fixData = _.omit(response.data, [
          "ProjectCollaboration_Partisipasi",
          "Author",
        ]);
        setData(fixData as MODEL_COLLABORATION);
      }
    } catch (error) {
      clientLogger.error("Error get one collaboration by id", error);
    }
  }

  async function onLoadIndustri() {
    try {
      const response = await apiGetMasterIndustri();

      if (response.success) {
        setListIndustri(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get master industri", error);
    }
  }

  if (data === undefined || listIndustri === null)
    return <CustomSkeleton height={400} />;

  return (
    <>
      <Stack px={"xs"} py={"md"}>
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
            },
          }}
          label="Judul"
          withAsterisk
          placeholder="Masukan judul proyek"
          value={data?.title}
          onChange={(val) =>
            setData({
              ...data,
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
            },
          }}
          label="Lokasi"
          withAsterisk
          placeholder="Masukan lokasi proyek"
          value={data?.lokasi}
          onChange={(val) =>
            setData({
              ...data,
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
            },
          }}
          placeholder="Pilih kategori industri"
          label="Pilih Industri"
          withAsterisk
          value={data?.ProjectCollaborationMaster_Industri.id}
          data={
            _.isEmpty(listIndustri)
              ? []
              : listIndustri.map((e) => ({
                  value: e.id,
                  label: e.name,
                }))
          }
          onChange={
            (val) =>
              setData({
                ...(data as any),
                ProjectCollaborationMaster_Industri: {
                  id: val as any,
                },
              })
            // console.log(val)
          }
        />

        <Stack spacing={5}>
          <Component_V3_Label_TextInput text="Tujuan Proyek" />

          <Component_V3_TextEditor
            data={data?.purpose}
            onSetData={(val) => {
              setData({
                ...data,
                purpose: val,
              });
            }}
          />

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: data?.purpose }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        <Stack spacing={5}>
          <Component_V3_Label_TextInput text="Keuntungan" />

          <Component_V3_TextEditor
            data={data?.benefit}
            onSetData={(val) => {
              setData({
                ...data,
                benefit: val,
              });
            }}
          />

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: data?.benefit }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        <ButtonAction value={data as any} />
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

    setLoading(true);
    await colab_funEditById(value as any).then((res) => {
      try {
        if (res.status === 200) {
          router.back();
          ComponentGlobal_NotifikasiBerhasil(res.message);
        } else {
          setLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } catch (error) {
        setLoading(false);
        clientLogger.error("Error update proyek", error);
      }
    });
  }

  return (
    <>
      <Button
        disabled={
          !value.title ||
          !value.lokasi ||
          value.projectCollaborationMaster_IndustriId === 0 ||
          funReplaceHtml({ html: value.purpose }).length > maxInputLength ||
          funReplaceHtml({ html: value.purpose }).length === 0 ||
          funReplaceHtml({ html: value.benefit }).length > maxInputLength ||
          funReplaceHtml({ html: value.benefit }).length === 0
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
