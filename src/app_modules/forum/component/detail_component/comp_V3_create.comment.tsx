"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { Component_V3_TextEditorWithSticker } from "@/app_modules/_global/lib/stiker/comp_V3_text_editor_stiker";
import { Comp_ButtonSticker } from "@/app_modules/_global/lib/stiker/comp_button_sticker";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  Text
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { forum_funCreateKomentar } from "../../fun/create/fun_create_komentar";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_POSTING,
} from "../../model/interface";
import { ISticker } from "@/app_modules/_global/lib/interface/stiker";

export default function Forum_V3_CreateKomentar({
  postingId,
  data,
  userLoginId,
  onSetLoadData,
  dataSticker,
}: {
  postingId: string;
  data: MODEL_FORUM_POSTING;
  userLoginId: string;
  onSetLoadData: (val: string) => void;
  dataSticker: ISticker[] | null;
}) {
  const [loading, setLoading] = useState(false);
  const [isComment, setIsComment] = useState(false);

  // New State
  const [editorContent, setEditorContent] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const quillRef = React.useRef<any>(null);
  const [quillLoaded, setQuillLoaded] = useState(false);

  async function onComment() {
    if (editorContent.length > 500) {
      return null;
    }

    try {
      setLoading(true);
      const createComment = await forum_funCreateKomentar(
        postingId,
        editorContent
      );

      if (createComment.status === 201) {
        const newCommentar: MODEL_FORUM_KOMENTAR | any = {
          komentar: editorContent,
          Author: createComment.data?.Author,
          createdAt: data.createdAt,
          id: createComment.data?.id,
        };
        onSetLoadData(newCommentar);
        setEditorContent("");
        ComponentGlobal_NotifikasiBerhasil(createComment.message, 2000);

        if (userLoginId !== data.Author.id) {
          const dataNotif = {
            appId: data.id,
            userId: data.authorId,
            pesan: editorContent,
            kategoriApp: "FORUM",
            title: "Komentar baru",
          };

          const createNotifikasi = await notifikasiToUser_funCreate({
            data: dataNotif as any,
          });

          if (createNotifikasi.status === 201) {
            mqtt_client.publish(
              "USER",
              JSON.stringify({
                userId: dataNotif.userId,
                count: 1,
              })
            );
          }
        }
      } else {
        ComponentGlobal_NotifikasiGagal(createComment.message);
      }
    } catch (error) {
      clientLogger.error("Error create komentar forum", error);
    } finally {
      setLoading(false);
    }
  }

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

  //  // Function to send message
  //  const sendMessage = () => {
  //    if (editorContent.trim() !== "") {
  //      setChat((prev) => [...prev, { content: editorContent }]);
  //      setEditorContent(""); // Clear after sending
  //    }
  //  };

  return (
    <>
      <Stack>
        {isComment ? (
          <Stack>
            <Paper p={5} shadow="lg" bg={MainColor.white}>
              <Group position="right">
                <ActionIcon
                  onClick={() => setIsComment(false)}
                  variant="transparent"
                >
                  <IconX size={25} color={MainColor.darkblue} />
                </ActionIcon>
              </Group>

              {quillLoaded && (
                <Component_V3_TextEditorWithSticker
                  quillRef={quillRef}
                  data={editorContent}
                  onSetData={setEditorContent}
                />
              )}
            </Paper>
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
                  dataSticker={dataSticker}
                />

                <Button
                  style={{
                    transition: "0.5s",
                  }}
                  disabled={
                    editorContent === "<p><br></p>" ||
                    editorContent === "" ||
                    funReplaceHtml({ html: editorContent }).length >
                      maxInputLength
                  }
                  bg={MainColor.yellow}
                  color={"yellow"}
                  c="black"
                  loaderPosition="center"
                  loading={loading}
                  radius={"xl"}
                  onClick={() => onComment()}
                >
                  Balas
                </Button>
              </Group>
            </Group>
          </Stack>
        ) : (
          <Paper
            onClick={() => setIsComment(true)}
            py="sm"
            px={"xl"}
            withBorder
            shadow="lg"
            bg={MainColor.white}
          >
            <Text fs={"italic"} c={"gray.8"} fz={12}>
              Buka kolom komentar untuk menambahkan komentar ...
            </Text>
          </Paper>
        )}
      </Stack>
    </>
  );
}
