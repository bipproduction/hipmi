"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetOneForumById } from "../../component/api_fetch_forum";
import { forum_funEditPostingById } from "../../fun/edit/fun_edit_posting_by_id";
import { MODEL_FORUM_POSTING } from "../../model/interface";

export default function Forum_EditPosting() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);
  const [lengthData, setLengthData] = useState<number>(0);

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

  if (!data) return <CustomSkeleton height={200} />;

  return (
    <>
      <Stack>
        {/* <Component_V3_TextEditor
          data={data.diskusi}
          onSetData={(value) => {
            setData({
              ...data,
              diskusi: value,
            });
          }}
          onSetLengthData={(value) => {
            console.log(value);
            setLengthData(value);
          }}
        /> */}

        {/* <Paper withBorder shadow="lg" p={"xs"}>
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
        </Paper> */}

        <Group position="apart">
          <ComponentGlobal_InputCountDown
            maxInput={maxInputLength}
            lengthInput={funReplaceHtml({ html: data.diskusi }).length}
          />
          <ButtonAction
            diskusi={data.diskusi as any}
            postingId={data.id}
            lengthData={lengthData}
          />
        </Group>
      </Stack>
    </>
  );
}

function ButtonAction({
  postingId,
  diskusi,
  lengthData,
}: {
  postingId: string;
  diskusi: string;
  lengthData: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    // if (diskusi === "<p><br></p>" || diskusi === "")
    //   return ComponentGlobal_NotifikasiPeringatan("Masukan postingan anda");

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
        }}
        disabled={lengthData === 0 || lengthData > maxInputLength}
        loaderPosition="center"
        loading={loading}
        radius={"xl"}
        bg={MainColor.yellow}
        color={"yellow"}
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
