"use client";
import React, { useState, useEffect } from "react";
import {
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
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { MainColor } from "@/app_modules/_global/color";
import { listStiker } from "@/app_modules/_global/lib/stiker";

// Dynamic import ReactQuill dengan SSR disabled
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // Tidak perlu import CSS dengan import statement
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <p>Loading Editor...</p> }
);


type ChatItem = {
  content: string; // HTML content including text and stickers
};

export default function Page() {
  const [editorContent, setEditorContent] = useState("");
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const quillRef = React.useRef<any>(null);
  const [quillLoaded, setQuillLoaded] = useState(false);

  // Load CSS on client-side only
  useEffect(() => {
    // Add Quill CSS via <link> tag
    const link = document.createElement("link");
    link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add custom style for stickers inside Quill editor
    const style = document.createElement("style");
    style.textContent = `
    .ql-editor img {
      max-width: 100px !important;
      max-height: 100px !important;
    }
      .chat-content img {
      max-width: 70px !important;
      max-height: 70px !important;
    }
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
      ["link", "image"],
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

  // Function to send message
  const sendMessage = () => {
    if (editorContent.trim() !== "") {
      setChat((prev) => [...prev, { content: editorContent }]);
      setEditorContent(""); // Clear after sending
    }
  };

  return (
    <Stack p={"md"} spacing="md">
      <SimpleGrid cols={2}>
        <Stack bg={"gray.1"} h={560} p="md">
          <Stack>
            <ScrollArea>
              {chat.map((item, index) => (
                <Box key={index} mb="md">
                  <div
                    className="chat-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </Box>
              ))}
            </ScrollArea>
          </Stack>
        </Stack>
        <Paper withBorder p="md">
          <Text size="sm" weight={500} mb="xs">
            Chat Preview Data:
          </Text>
          <ScrollArea h={520}>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(chat, null, 2)}
            </pre>
          </ScrollArea>
        </Paper>
      </SimpleGrid>

      <Box w="100%" maw={800}>
        <Box mb="xs" bg={MainColor.white}>
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
                height: 120,
                marginBottom: 40,
                backgroundColor: MainColor.white,
              }}
            />
          )}
        </Box>

        <Group position="apart">
          <Button variant="outline" onClick={open} color="blue">
            Tambah Stiker
          </Button>

          <Button onClick={sendMessage}>Kirim Pesan</Button>
        </Group>
      </Box>

      {/* Sticker Modal */}
      <Modal opened={opened} onClose={close} title="Pilih Stiker" size="md">
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
    </Stack>
  );
}
