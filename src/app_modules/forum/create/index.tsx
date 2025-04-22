"use client";

// import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import { Button, Group, Paper, ScrollArea, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import dynamic from "next/dynamic";
import { useState } from "react";
import { forum_funCreate } from "../fun/create/fun_create";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import mqtt_client from "@/util/mqtt_client";

const maxLength = 100;
export default function Forum_Create() {
  const [data, setData] = useState("");
  const [lengthData, setLengthData] = useState(0);

  const [reload, setReload] = useState(false);
  useShallowEffect(() => {
    if (window && window.document) setReload(true);
  }, []);

  // if (!reload) return <CustomSkeleton height={200} />;

  return (
    <>
      {/* <ReactQuill
        theme="snow"
        placeholder="Apa yang sedang ingin dibahas ?"
        style={{
          color: "black",
          backgroundColor: "white",
          height: 200,
        }}
        onChange={(input) => {
          const longLength = input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags and trim whitespace
          if (longLength.length === 0) {
            setData(""); // Set value to an empty string
            return;
          }

          setData(input);
          setLengthData(longLength.length);
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "link"],
            // [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
      /> */}

      <Stack>
        <Paper p={"sm"} withBorder shadow="lg" mah={200}>
          <ScrollArea h={180}>
            {!reload ? (
              <CustomSkeleton height={100} />
            ) : (
              <ReactQuill
                placeholder={"Apa yang sedang ingin dibahas ?"}
                style={{
                  color: "black",
                  backgroundColor: "white",
                  border: "none",
                }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "link"],
                    // [{ align: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
                theme="snow"
                onChange={(input) => {
                  const text = input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags and trim whitespace
                  if(text.length > 100){
                    

                  }


                  setData(input);
                  setLengthData(text.length);
                }}
              />
            )}
          </ScrollArea>
        </Paper>
        <ComponentGlobal_InputCountDown
          maxInput={maxLength}
          lengthInput={lengthData}
        />
      </Stack>

      {/* <Stack>
        <Paper withBorder shadow="lg" p={"xs"}>
          <ReactQuill
            theme="bubble"
            placeholder="Apa yang sedang ingin dibahas ?"
            style={{ height: 150 }}
            onChange={(val) => {
              const input = val;
              const text = input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags and trim whitespace
              if (text.length === 0) {
                setData(""); // Set value to an empty string
                return;
              }
              setData(val);
            }}
          />
        </Paper>

        <Group position="right">
          <ComponentGlobal_InputCountDown
            maxInput={maxLength}
            lengthInput={lengthData}
          />
        </Group>
        <Group position="right">
          <ButtonAction value={data} lengthData={lengthData} />
        </Group>
      </Stack> */}
    </>
  );
}

function ButtonAction({
  value,
  lengthData,
}: {
  value: string;
  lengthData: number;
}) {
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
          transition: "all 0.5s",
        }}
        bg={MainColor.yellow}
        color={"yellow"}
        c="black"
        disabled={
          value === "<p><br></p>" || value === "" || lengthData >= maxLength
        }
        radius={"xl"}
        loading={loading}
        loaderPosition="center"
        onClick={() => onCreate()}
      >
        Posting
      </Button>
    </>
  );
}
