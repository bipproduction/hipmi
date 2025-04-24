"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import mqtt_client from "@/util/mqtt_client";
import { Button, Group, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { forum_funCreate } from "../fun/create/fun_create";
import { Component_V3_TextEditor } from "@/app_modules/_global/component/new/comp_V3_text_editor";

export default function Forum_NewCreate() {
  const [data, setData] = useState<string>("");
  const [lengthData, setLengthData] = useState<number>(0);

  return (
    <Stack>
      <Component_V3_TextEditor
        data={data}
        onSetData={(val) => {
          setData(val);
        }}
        onSetLengthData={(val) => {
          setLengthData(val);
        }}
      />

      <Group position="apart">
        <ComponentGlobal_InputCountDown
          maxInput={maxInputLength}
          lengthInput={lengthData}
        />
        <ButtonAction value={data} lengthData={lengthData} />
      </Group>
    </Stack>
  );
}

interface ButtonActionProps {
  value: string;
  lengthData: number;
}

function ButtonAction({ value, lengthData }: ButtonActionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function onCreate() {
    try {
      setLoading(true);
      const create = await forum_funCreate(value);
      if (create.status === 201) {
        ComponentGlobal_NotifikasiBerhasil(create.message);
        router.back();

        mqtt_client.publish(
          "Forum_create_new",
          JSON.stringify({ isNewPost: true, count: 1 })
        );
      } else {
        ComponentGlobal_NotifikasiGagal(create.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      style={{ transition: "all 0.5s" }}
      bg={MainColor.yellow}
      color="yellow"
      c="black"
      disabled={lengthData === 0 || lengthData > maxInputLength}
      radius="xl"
      loading={loading}
      loaderPosition="center"
      onClick={onCreate}
    >
      Posting
    </Button>
  );
}
