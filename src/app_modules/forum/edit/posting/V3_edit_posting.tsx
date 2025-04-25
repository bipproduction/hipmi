"use client";

import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { Comp_ButtonSticker } from "@/app_modules/_global/lib/stiker/comp_button_sticker";
import { Component_V3_TextEditorWithSticker } from "@/app_modules/_global/lib/stiker/comp_V3_text_editor_stiker";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { Group, Stack } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { apiGetOneForumById } from "../../component/api_fetch_forum";
import Forum_ButtonUpdatePosting from "../../component/button/button_update_posting";
import { MODEL_FORUM_POSTING } from "../../model/interface";

export default function Forum_V3_EditPosting() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);

  //   New State
  const [opened, { open, close }] = useDisclosure(false);
  const quillRef = React.useRef<any>(null);
  const [quillLoaded, setQuillLoaded] = useState<boolean>(false);

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

  useShallowEffect(() => {
    // Add Quill CSS via <link> tag
    const link = document.createElement("link");
    link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add custom style for stickers inside Quill editor
    const style = document.createElement("style");
    style.textContent = `
      .ql-editor img {
      max-width: 70px !important;
      max-height: 70px !important;
    }
    //   .chat-content img {
    //   max-width: 70px !important;
    //   max-height: 70px !important;
    // }
  `;
    document.head.appendChild(style);

    setQuillLoaded(true);

    return () => {
      // Clean up when component unmounts
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  if (!data) return <CustomSkeleton height={200} />;

  return (
    <>
      <Stack>
        {quillLoaded && (
          <Component_V3_TextEditorWithSticker
            quillRef={quillRef}
            data={data.diskusi}
            onSetData={(val) => {
              setData({
                ...data,
                diskusi: val,
              });
            }}
          />
        )}

        <Group position="apart">
          <ComponentGlobal_InputCountDown
            maxInput={maxInputLength}
            lengthInput={funReplaceHtml({ html: data.diskusi }).length}
          />

          <Group position="right">
            <Comp_ButtonSticker
              open={open}
              close={close}
              opened={opened}
              quillRef={quillRef}
            />

            <Forum_ButtonUpdatePosting
              diskusi={data.diskusi}
              postingId={param.id}
            />
          </Group>
        </Group>
      </Stack>
    </>
  );
}
