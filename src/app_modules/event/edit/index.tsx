"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import { clientLogger } from "@/util/clientLogger";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  apiGetEventDetailById,
  apiGetMasterTipeAcara,
} from "../_lib/api_event";
import { MODEL_EVENT } from "../_lib/interface";
import ComponentEvent_ErrorMaximalInput from "../component/error_maksimal_input";
import { Event_funEditById } from "../fun/edit/fun_edit_by_id";
import { useParams } from "next/navigation";
import { ComponentGlobal_BoxInformation } from "@/app_modules/_global/component";
import { baseStylesTextInput } from "@/app_modules/_global/lib/base_style_text_input";

export default function Event_Edit() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState<MODEL_EVENT | null | any>();
  const [listTipeAcara, setListTipeAcara] = useState<
    MODEL_DEFAULT_MASTER_OLD[]
  >([]);

  const [isTimeStart, setIsTimeStart] = useState(false);
  const [diffTimeStart, setDiffTimeStart] = useState(0);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [diffTimeEnd, setDiffTimeEnd] = useState(0);

  useShallowEffect(() => {
    handleGetMasterTipeAcara();
  }, []);

  async function handleGetMasterTipeAcara() {
    try {
      const response = await apiGetMasterTipeAcara();
      if (response.success) {
        setListTipeAcara(response.data);
      } else {
        setListTipeAcara([]);
      }
    } catch (error) {
      setListTipeAcara([]);
    }
  }

  useShallowEffect(() => {
    handleGetDetailEvent();
  }, []);

  async function handleGetDetailEvent() {
    try {
      const response = await apiGetEventDetailById({ id: id as string });
      if (response.success) {
        const fixData = _.omit(response.data, [
          "Author",
          "EventMaster_Status",
          "Event_Peserta",
          "createdAt",
          "updatedAt",
          "active",
        ]);
        setData(fixData as any);
      } else {
        setData(null);
      }
    } catch (error) {
      setData(null);
    }
  }

  if (!listTipeAcara.length || !data) {
    return <CustomSkeleton height={400} />;
  }

  if (data === undefined) {
    return <ComponentGlobal_BoxInformation informasi="Data Tidak Ditemukan" />;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack px={"xl"}>
        <TextInput
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
          placeholder="judul"
          withAsterisk
          value={data?.title}
          maxLength={100}
          error={
            data?.title === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan judul" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setData({
              ...(data as any),
              title: val.target.value,
            });
          }}
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
          withAsterisk
          label="Tipe Acara"
          placeholder="Pilih Tipe Acara"
          data={listTipeAcara.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          value={data.EventMaster_TipeAcara.id}
          onChange={(val) => {
            setData({
              ...(data as any),
              EventMaster_TipeAcara: {
                id: val,
              },
            });
          }}
        />

        <TextInput
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
          placeholder="lokasi acara"
          withAsterisk
          value={data.lokasi}
          maxLength={100}
          error={
            data.lokasi === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan lokasi" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setData({
              ...data,
              lokasi: val.target.value,
            });
          }}
        />

        <DateTimePicker
          styles={{
            ...baseStylesTextInput,
            required: {
              color: MainColor.red,
            },
          }}
          excludeDate={(date) => {
            return moment(date).diff(Date.now(), "days") < 0;
          }}
          withAsterisk
          label="Tanggal & Waktu Mulai"
          placeholder="Masukan tangal dan waktu"
          value={moment(data.tanggal).toDate()}
          error={
            isTimeStart ? (
              <ComponentEvent_ErrorMaximalInput text="Invalid Time !" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            const diffTime = moment(val?.toISOString().toString()).diff(
              moment(),
              "minutes"
            );
            setDiffTimeStart(diffTime);

            moment(val?.toISOString().toString()).diff(moment(), "minutes") < 0
              ? setIsTimeStart(true)
              : setIsTimeStart(false);

            setData({
              ...data,
              tanggal: val,
            });
          }}
        />

        <DateTimePicker
          styles={{
            ...baseStylesTextInput,
            required: {
              color: MainColor.red,
            },
          }}
          excludeDate={(date) => {
            return moment(date).diff(Date.now(), "days") < 0;
          }}
          withAsterisk
          label="Tanggal & Waktu Berakhir"
          placeholder="Masukan tangal dan waktu"
          value={moment(data.tanggalSelesai).toDate()}
          error={
            isTimeEnd ? (
              <ComponentEvent_ErrorMaximalInput text="Invalid Time !" />
            ) : moment(data.tanggalSelesai) < moment(data.tanggal) ? (
              <ComponentGlobal_ErrorInput text="Invalid Time !" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            const diffTime = moment(val?.toISOString().toString()).diff(
              moment(),
              "minutes"
            );
            setDiffTimeEnd(diffTime);

            moment(val?.toISOString().toString()).diff(moment(), "minutes") < 0
              ? setIsTimeEnd(true)
              : setIsTimeEnd(false);

            setData({
              ...data,
              tanggalSelesai: val,
            });
          }}
        />

        <Stack spacing={5}>
          <Component_V3_Label_TextInput text="Deskripsi" />

          <Component_V3_TextEditor
            data={data.deskripsi}
            onSetData={(val) => {
              setData({
                ...data,
                deskripsi: val.trim(),
              });
            }}
          />

          {funReplaceHtml({ html: data.deskripsi }).length === 0 && (
            <ComponentGlobal_ErrorInput text="Masukan deskripsi" />
          )}

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: data.deskripsi }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        <Button
          style={{
            transition: "0.5s",
          }}
          // disabled={
          //   data.title === "" ||
          //   data.lokasi === "" ||
          //   data.eventMaster_TipeAcaraId === 0 ||
          //   moment(data.tanggalSelesai?.toISOString().toString()) <
          //     moment(data.tanggal.toISOString().toString()) ||
          //   funReplaceHtml({ html: data.deskripsi }).length > maxInputLength ||
          //   funReplaceHtml({ html: data.deskripsi }).length === 0
          // }
          loaderPosition="center"
          loading={isLoading ? true : false}
          radius={"xl"}
          mt={"xl"}
          onClick={() => onUpdate(router, data, setLoading)}
          bg={MainColor.yellow}
          color="yellow"
          c={MainColor.darkblue}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}

async function onUpdate(
  router: AppRouterInstance,
  value: MODEL_EVENT,
  setLoading: any
) {
  if (_.values(value).includes(""))
    return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

  try {
    setLoading(true);
    const res = await Event_funEditById(value);

    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      setLoading(false);
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  } catch (error) {
    setLoading(false);
    clientLogger.error("Error update event", error);
  }
}
