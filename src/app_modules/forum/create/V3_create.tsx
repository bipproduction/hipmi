"use client";

import { ComponentGlobal_InputCountDown } from "@/app_modules/_global/component";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { Component_V3_TextEditorWithSticker } from "@/app_modules/_global/lib/stiker/comp_V3_text_editor_stiker";
import { Comp_ButtonSticker } from "@/app_modules/_global/lib/stiker/comp_button_sticker";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Group, Stack } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Forum_ButtonCreatePosting from "../component/button/button_create_posting";

export function Forum_V3_Create() {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const quillRef = React.useRef<any>(null);
  const [quillLoaded, setQuillLoaded] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useShallowEffect(() => {
    setIsReady(true); // Set ready on client-side mount
  }, []);

  useShallowEffect(() => {
    setQuillLoaded(true); // Set ready on client-side mount
  }, []);

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

  return (
    <>
      {isReady ? (
        <Stack>
          {quillLoaded && (
            <Component_V3_TextEditorWithSticker
              quillRef={quillRef}
              data={editorContent}
              onSetData={setEditorContent}
            />
          )}

          <Group position="apart">
            <ComponentGlobal_InputCountDown
              maxInput={maxInputLength}
              lengthInput={funReplaceHtml({ html: editorContent }).length}
            />

            <Group position="right">
              <Comp_ButtonSticker
                open={open}
                close={close}
                opened={opened}
                quillRef={quillRef}
              />

              <Forum_ButtonCreatePosting value={editorContent} />
            </Group>
          </Group>
        </Stack>
      ) : (
        <CustomSkeleton height={300} />
      )}
    </>
  );
}
