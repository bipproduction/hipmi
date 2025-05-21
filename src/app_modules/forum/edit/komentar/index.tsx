"use client";

import { Button, Group, Paper, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { gs_forum_loading_edit_posting } from "../../global_state";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

export default function Forum_EditKomentar() {
  const [value, setValue] = useState("");

  return (
    <>
      <Stack>
        <Paper withBorder shadow="lg">
          <ReactQuill
            theme="bubble"
            placeholder="Apa yang sedang hangat dibicarakan ?"
            style={{ height: 150 }}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </Paper>
        <Group position="right">
          <ButtonAction />
        </Group>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </>
  );
}

function ButtonAction() {
  const router = useRouter();
  const [loadingEdit, setLoadingEdit] = useAtom(gs_forum_loading_edit_posting);

  return (
    <>
      <Button
        radius={"xl"}
        onClick={() => {
          router.back();
        }}
      >
        Update
      </Button>
    </>
  );
}
