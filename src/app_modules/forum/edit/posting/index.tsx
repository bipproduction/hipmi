"use client";

import { Button, Group, Paper, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import dynamic from "next/dynamic";
import { useState } from "react";
import { apiGetOneForumById } from "../../component/api_fetch_forum";
import { forum_funEditPostingById } from "../../fun/edit/fun_edit_posting_by_id";
import { MODEL_FORUM_POSTING } from "../../model/interface";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

const maxLength = 500;

export default function Forum_EditPosting() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);
  const [reload, setReload] = useState(false);
  useShallowEffect(() => {
    if (window && window.document) setReload(true);
  }, []);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneForumById({
        id: param.id,
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data forum", error);
    }
  };

  if (!reload || !data) return <CustomSkeleton height={200} />;

  return (
    <>
      <Stack>
        <Paper withBorder shadow="lg" p={"xs"}>
          <ReactQuill
            theme="bubble"
            placeholder="Apa yang sedang ingin dibahas ?"
            style={{ height: 150 }}
            value={data.diskusi}
            onChange={(val) => {
              const input = val;
              const text = input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags and trim whitespace

              if (text.length === 0) {
                setData({
                  ...data,
                  diskusi: "",
                });

                return;
              }
              setData({
                ...data,
                diskusi: val,
              });
            }}
          />
        </Paper>
        <Group position="right">
          <ComponentGlobal_InputCountDown
            maxInput={maxLength}
            lengthInput={data.diskusi.length}
          />
        </Group>
        <Group position="right">
          <ButtonAction diskusi={data.diskusi as any} postingId={data.id} />
        </Group>
      </Stack>
      {/* <div dangerouslySetInnerHTML={{ __html: value.diskusi }} /> */}
    </>
  );
}

function ButtonAction({
  postingId,
  diskusi,
}: {
  postingId: string;
  diskusi: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    if (diskusi === "<p><br></p>" || diskusi === "")
      return ComponentGlobal_NotifikasiPeringatan("Masukan postingan anda");

    try {
      setLoading(true);
      const update = await forum_funEditPostingById(postingId, diskusi);

      if (update.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(update.message);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(update.message);
      }
    } catch (error) {
      clientLogger.error("Error update forum", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        style={{
          transition: "0.5s",
          backgroundColor:
            diskusi === "<p><br></p>" ||
            diskusi === "" ||
            diskusi.length >= maxLength
              ? ""
              : MainColor.yellow,
        }}
        disabled={
          diskusi === "<p><br></p>" ||
          diskusi === "" ||
          diskusi.length >= maxLength
            ? true
            : false
        }
        loaderPosition="center"
        loading={loading}
        radius={"xl"}
        c={"black"}
        onClick={() => {
          onUpdate();
        }}
      >
        Update
      </Button>
    </>
  );
}
