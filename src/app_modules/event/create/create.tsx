"use client";

import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import {
  Button,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import moment from "moment";
import { useState } from "react";
import { Event_ComponentCreateButton } from "../component";
import ComponentEvent_ErrorMaximalInput from "../component/error_maksimal_input";
import { MainColor } from "@/app_modules/_global/color";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";

export default function Event_Create({
  listTipeAcara,
  authorId,
}: {
  listTipeAcara: MODEL_DEFAULT_MASTER_OLD[];
  authorId: string;
}) {
  const [listTipe, setListTipe] = useState(listTipeAcara);

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
    authorId: authorId,
  });

  return (
    <>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
      <Stack px={"xl"}>
        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            input: {
              backgroundColor: MainColor.white,
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
            label: {
              color: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            input: {
              backgroundColor: MainColor.white,
            },
            dropdown: {
              backgroundColor: MainColor.white,
            },
          }}
          withAsterisk
          label="Tipe Acara"
          placeholder="Pilih Tipe Acara"
          data={listTipe.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val: any) =>
            setValue({
              ...value,
              eventMaster_TipeAcaraId: val,
            })
          }
        />

        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            input: {
              backgroundColor: MainColor.white,
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
            label: {
              color: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            input: {
              backgroundColor: MainColor.white,
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
            label: {
              color: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            input: {
              backgroundColor: MainColor.white,
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

        {/* <Stack spacing={5}>
          <Textarea
            styles={{
              label: {
                color: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              input: {
                backgroundColor: MainColor.white,
              },
            }}
            label="Deskripsi"
            placeholder="Deskripsikan acara yang akan di selenggarakan"
            withAsterisk
            autosize
            maxLength={300}
            onChange={(val) => {
              setValue({
                ...value,
                deskripsi: val.target.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.deskripsi.length}
            maxInput={300}
          />
        </Stack> */}

        <Event_ComponentCreateButton
          value={value}
          diffTimeStart={diffTimeStart}
          diffTimeEnd={diffTimeEnd}
        />
      </Stack>
    </>
  );
}
