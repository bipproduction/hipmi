"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import {
  Box,
  Button,
  Group,
  Image as MantineImage,
  Stack,
  Text,
} from "@mantine/core";
import Underline from "@tiptap/extension-underline";
import { MainColor } from "@/app_modules/_global/color";

const listStiker = [
  {
    id: 2,
    name: "stiker2",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN9AKmsBY4yqdn3GueJJEVPJbfmf853gDL4cN8uc9eqsCTiJ1fzhcpywzVP68NCJEA5NQ&usqp=CAU",
  },
  {
    id: 3,
    name: "stiker3",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2lkV3ZiQ8m-OELSui2JGVy80vnh1cyRUV7NrgFNluPVVs2HUAyCHwCMAKGe2s5jk2sn8&usqp=CAU",
  },
  {
    id: 4,
    name: "stiker4",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHy9ZdsPc6dHgVTl5yIGpRJ-KtpTIsXA2_kbfO1Oc-pv_f7CNKGxhO56RjKujE3xCyb9k&usqp=CAU",
  },
];

export default function RichTextWithStickers() {
  const [chat, setChat] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit, // Sudah include Bold, Italic, dll
      Underline, // Tambahan untuk underline
      Image,
    ],
    content: "",
  });

  const insertSticker = (url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  };

  return (
    <Stack p="md">
      <Text fw={700}>Tiptap Editor dengan Stiker Inline</Text>

      <Box
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: 8,
          minHeight: 150,
          backgroundColor: MainColor.white,
        }}
      >
        <Group spacing="xs" mb="sm">
          <Button
            variant="default"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            B
          </Button>
          <Button
            variant="default"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            I
          </Button>
          <Button
            variant="default"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            U
          </Button>
        </Group>
        <EditorContent
          editor={editor}
          style={{
            backgroundColor: "white",
          }}
        />
      </Box>

      <Button
        mt="sm"
        onClick={() => {
          if (editor) {
            setChat((prev) => [...prev, editor.getHTML()]);
            editor.commands.clearContent();
          }
        }}
      >
        Kirim
      </Button>

      <Group>
        {listStiker.map((item) => (
          <Box
            key={item.id}
            component="button"
            onClick={() => insertSticker(item.url)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <MantineImage
              w={30}
              h={30}
              src={item.url}
              alt={item.name}
              styles={{
                image: {
                  width: 30,
                  height: 30,
                },
              }}
            />
          </Box>
        ))}
      </Group>

      {/* <Stack mt="lg" p="md" bg="gray.1">
        {chat.map((item, index) => (
          <Box key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </Stack> */}
    </Stack>
  );
}
