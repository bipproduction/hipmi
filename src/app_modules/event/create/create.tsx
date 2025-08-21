"use client";

import { MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { baseStylesTextInput } from "@/app_modules/_global/lib/base_style_text_input";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import { Select, Stack, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { apiGetMasterTipeAcara } from "../_lib/api_event";
import { Event_ComponentCreateButton } from "../component";
import ComponentEvent_ErrorMaximalInput from "../component/error_maksimal_input";

export default function Event_Create() {
  const [listTipe, setListTipe] = useState<MODEL_DEFAULT_MASTER_OLD[] | null>();
  const [isTimeStart, setIsTimeStart] = useState(false);
  const [diffTimeStart, setDiffTimeStart] = useState(0);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [diffTimeEnd, setDiffTimeEnd] = useState(0);
  const [value, setValue] = useState({
    title: "",
    lokasi: "",
    deskripsi: "",
    tanggal: Date.toString(),
    tanggalSelesai: Date.toString(),
    eventMaster_TipeAcaraId: 0,
    authorId: "",
  });

  useShallowEffect(() => {
    handleGetUserLoginId();
  }, []);

  async function handleGetUserLoginId() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setValue({
          ...value,
          authorId: response.userId,
        });
      }
    } catch (error) {
      setValue({
        ...value,
        authorId: "",
      });
    }
  }

  useShallowEffect(() => {
    handleGetMasterTipeAcara();
  }, []);

  async function handleGetMasterTipeAcara() {
    try {
      const response = await apiGetMasterTipeAcara();
      if (response.success) {
        setListTipe(response.data);
      } else {
        setListTipe([]);
      }
    } catch (error) {
      setListTipe([]);
    }
  }

  if (!listTipe || !value.authorId) {
    return <CustomSkeleton height={400} />;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack px={"sm"}>
        <TextInput
          styles={{
            ...baseStylesTextInput,
            required: {
              color: MainColor.red,
            },
          }}
          label="Judul"
          placeholder="Masukan judul"
          withAsterisk
          maxLength={100}
          onChange={(val) => {
            setValue({
              ...value,
              title: val.target.value,
            });
          }}
        />
        <Select
          styles={{
            ...baseStylesTextInput,
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
          data={
            _.isEmpty(listTipe)
              ? []
              : listTipe.map((e) => ({
                  value: e.id,
                  label: e.name,
                }))
          }
          onChange={(val: any) =>
            setValue({
              ...value,
              eventMaster_TipeAcaraId: val,
            })
          }
        />

        <TextInput
          styles={{
            ...baseStylesTextInput,
            required: {
              color: MainColor.red,
            },
          }}
          label="Lokasi"
          placeholder="Masukan lokasi acara"
          withAsterisk
          maxLength={100}
          onChange={(val) => {
            setValue({
              ...value,
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
          error={
            isTimeStart ? (
              <ComponentEvent_ErrorMaximalInput text="Invalid Time !" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            // console.log(
            //   moment(val?.toISOString().toString()).diff(moment(), "minutes" )
            // );
            const diffTime = moment(val?.toISOString().toString()).diff(
              moment(),
              "minutes"
            );
            setDiffTimeStart(diffTime);

            moment(val?.toISOString().toString()).diff(moment(), "minutes") < 0
              ? setIsTimeStart(true)
              : setIsTimeStart(false);

            setValue({
              ...value,
              tanggal: val as any,
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
          placeholder="Masukan tangal dan waktu "
          error={
            isTimeEnd ? (
              <ComponentEvent_ErrorMaximalInput text="Invalid Time !" />
            ) : diffTimeEnd - 1 < diffTimeStart && diffTimeEnd != 0 ? (
              <ComponentEvent_ErrorMaximalInput text="Invalid Time !" />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            // console.log(
            //   moment(val?.toISOString().toString()).diff(moment(), "minutes" )
            // );
            const diffTime = moment(val?.toISOString().toString()).diff(
              moment(),
              "minutes"
            );
            setDiffTimeEnd(diffTime);

            moment(val?.toISOString().toString()).diff(moment(), "minutes") < 0
              ? setIsTimeEnd(true)
              : setIsTimeEnd(false);

            setValue({
              ...value,
              tanggalSelesai: val as any,
            });
          }}
        />

        <Stack spacing={5}>
          <Component_V3_Label_TextInput text="Deskripsi" />

          <Component_V3_TextEditor
            data={value.deskripsi}
            onSetData={(val) => {
              setValue({
                ...value,
                deskripsi: val,
              });
            }}
          />

          <ComponentGlobal_InputCountDown
            lengthInput={funReplaceHtml({ html: value.deskripsi }).length}
            maxInput={maxInputLength}
          />
        </Stack>

        <Event_ComponentCreateButton
          value={value}
          diffTimeStart={diffTimeStart}
          diffTimeEnd={diffTimeEnd}
        />
      </Stack>
    </>
  );
}
