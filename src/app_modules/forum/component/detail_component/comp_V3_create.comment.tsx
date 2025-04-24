"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import notifikasiToUser_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_user";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Modal,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { forum_funCreateKomentar } from "../../fun/create/fun_create_komentar";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_POSTING,
} from "../../model/interface";
import dynamic from "next/dynamic";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { listStiker } from "@/app_modules/_global/lib/stiker";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { maxInputLength } from "@/app_modules/_global/lib/maximal_setting";
import { funReplaceHtml } from "@/app_modules/_global/fun/fun_replace_html";
import { IconMoodSmileFilled, IconX } from "@tabler/icons-react";

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

type ChatItem = {
  content: string; // HTML content including text and stickers
};
export default function Forum_V3_CreateKomentar({
  postingId,
  data,
  userLoginId,
  onSetLoadData,
}: {
  postingId: string;
  data: MODEL_FORUM_POSTING;
  userLoginId: string;
  onSetLoadData: (val: string) => void;
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
            <Paper p="sm" withBorder shadow="lg" mah={300} bg={MainColor.white}>
              <Group position="right">
                <ActionIcon
                  onClick={() => setIsComment(false)}
                  variant="transparent"
                >
                  <IconX size={25} color={MainColor.darkblue} />
                </ActionIcon>
              </Group>
              <ScrollArea h={250}>
                {quillLoaded && (
                  <ReactQuill
                    forwardedRef={quillRef}
                    theme="snow"
                    value={editorContent}
                    onChange={setEditorContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Ketik pesan di sini atau tambahkan stiker..."
                    style={{
                      marginBottom: 40,
                      backgroundColor: MainColor.white,
                    }}
                  />
                )}
              </ScrollArea>
            </Paper>
            <Group position="apart">
              <ComponentGlobal_InputCountDown
                maxInput={maxInputLength}
                lengthInput={funReplaceHtml({ html: editorContent }).length}
              />

              <Group position="right">
                <ActionIcon onClick={open} variant="transparent">
                  <IconMoodSmileFilled color={MainColor.white} size={30} />
                </ActionIcon>

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
              Ketik pesan di sini atau tambahkan stiker...
            </Text>
          </Paper>
        )}

        {/* <Text c="white">{JSON.stringify(editorContent, null, 2)}</Text> */}

        {/* Sticker Modal */}
        <Modal
          opened={opened}
          onClose={close}
          title="Pilih Stiker"
          size="md"
          centered
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
        </Modal>

        {/* <Group position="apart">
          <ComponentGlobal_InputCountDown
            maxInput={500}
            lengthInput={editorContent.length}
          />

          <Button
            style={{
              transition: "0.5s",
            }}
            disabled={
              editorContent === "" ||
              editorContent === "<p><br></p>" ||
              editorContent.length > 500
                ? true
                : false
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
        </Group> */}
      </Stack>
    </>
  );
}
