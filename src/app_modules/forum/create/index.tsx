"use client";

import { Button, Group, Paper, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import dynamic from "next/dynamic";
import { useState } from "react";
import { forum_funCreate } from "../fun/create/fun_create";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import {
  MainColor
} from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import mqtt_client from "@/util/mqtt_client";

const maxLength = 500;
export default function Forum_Create() {
  const [value, setValue] = useState("");
  const [totalLength, setTotalLength] = useState(0);

  const [reload, setReload] = useState(false);
  useShallowEffect(() => {
    if (window && window.document) setReload(true);
  }, []);

  if (!reload) return <CustomSkeleton height={200} />;

  return (
    <>
      <Stack>
        <Paper withBorder shadow="lg" p={"xs"}>
          <ReactQuill
            theme="bubble"
            placeholder="Apa yang sedang ingin dibahas ?"
            style={{ height: 150 }}
            onChange={(val) => {
              const input = val;
              const text = input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags and trim whitespace
              if (text.length === 0) {
                setValue(""); // Set value to an empty string
                return;
              }
              setValue(val);
            }}
          />
        </Paper>
        <Group position="right">
          <ComponentGlobal_InputCountDown
            maxInput={maxLength}
            lengthInput={value.length}
          />
        </Group>
        <Group position="right">
          <ButtonAction value={value} />
        </Group>
      </Stack>
    </>
  );
}

function ButtonAction({ value }: { value: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onCreate() {
    if (value.length >= maxLength) {
      return null;
    }

    const create = await forum_funCreate(value);
    if (create.status === 201) {
      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil(create.message);
      setTimeout(() => router.back(), 200);

      mqtt_client.publish(
        "Forum_create_new",
        JSON.stringify({ isNewPost: true, count: 1 })
      );
    } else {
      ComponentGlobal_NotifikasiGagal(create.message);
    }
  }
  return (
    <>
      <Button
        style={{
          transition: "0.5s",
        }}
        bg={MainColor.yellow}
        color={"yellow"}
        c="black"
        disabled={
          value === "<p><br></p>" || value === "" || value.length >= maxLength
        }
        radius={"xl"}
        loading={loading ? true : false}
        loaderPosition="center"
        onClick={() => onCreate()}
      >
        Posting
      </Button>
    </>
  );
}
