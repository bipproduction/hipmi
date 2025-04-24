"use client";

import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_InputCountDown } from "@/app_modules/_global/component";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { listStiker } from "@/app_modules/_global/lib/stiker";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { forum_funCreate } from "../fun/create/fun_create";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // Tidak perlu import CSS dengan import statement
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => (
      <Text fs={"italic"} c={"gray.8"} fz={12}>
        Ketik pesan di sini atau tambahkan stiker...
      </Text>
    ),
  }
);

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

  // Custom toolbar options for ReactQuill
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const insertSticker = (stickerUrl: string) => {
    if (!quillRef.current) return;

    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);

    // Custom image insertion with size
    // Use custom blot or HTML string with size attributes
    const stickerHtml = `<img src="${stickerUrl}" alt="sticker" style="width: 40px; height: 40px;">`;

    // Insert HTML at cursor position
    quill.clipboard.dangerouslyPasteHTML(range.index, stickerHtml);

    // Move cursor after inserted sticker
    quill.setSelection(range.index + 1, 0);

    // Focus back on editor
    quill.focus();

    // Close sticker modal
    close();
  };

  return (
    <>
      {isReady ? (
        <Stack>
          {quillLoaded && (
            <Paper p="sm" withBorder shadow="lg" mah={300} bg={MainColor.white}>
              <ScrollArea h={280}>
                <ReactQuill
                  forwardedRef={quillRef}
                  theme="snow"
                  value={editorContent}
                  onChange={setEditorContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Ketik pesan di sini atau tambahkan stiker..."
                  style={{
                    color: "black",
                    backgroundColor: MainColor.white,
                    border: "none",
                  }}
                />
              </ScrollArea>
            </Paper>
          )}

          <Group position="apart">
            <ComponentGlobal_InputCountDown
              maxInput={maxInputLength}
              lengthInput={funReplaceHtml({ html: editorContent }).length}
            />

            <Group position="right">
              <ActionIcon onClick={open} variant="transparent">
                <IconMoodSmileFilled color={MainColor.white} size={30} />
              </ActionIcon>

              <ButtonAction value={editorContent} />
            </Group>
          </Group>

          <UIGlobal_Modal
            opened={opened}
            close={close}
            title="Pilih Stiker"
            closeButton
          >
            <SimpleGrid cols={3} spacing="md">
              {listStiker.map((item) => (
                <Box key={item.id}>
                  <Tooltip label={item.name}>
                    <Image
                      src={item.url}
                      height={100}
                      width={100}
                      alt={item.name}
                      style={{ cursor: "pointer" }}
                      onClick={() => insertSticker(item.url)}
                    />
                  </Tooltip>
                </Box>
              ))}
            </SimpleGrid>
          </UIGlobal_Modal>
        </Stack>
      ) : (
        <CustomSkeleton height={300} />
      )}
    </>
  );
}

interface ButtonActionProps {
  value: string;
}

function ButtonAction({ value }: ButtonActionProps) {
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
      disabled={
        value === "<p><br></p>" ||
        value === "" ||
        funReplaceHtml({ html: value }).length > maxInputLength
      }
      bg={MainColor.yellow}
      color="yellow"
      c="black"
      radius="xl"
      loading={loading}
      loaderPosition="center"
      onClick={onCreate}
    >
      Posting
    </Button>
  );
}
