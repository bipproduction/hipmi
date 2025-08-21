import { Paper, ScrollArea } from "@mantine/core";
import React from "react";
import { MainColor } from "../../color";
import { ReactQuillDynamic } from "./react_quill_dynamix";
import {
    formatsReactQuill,
    modulesReactQuill,
} from "./react_quill_format_for_stiker";

const ReactQuill = ReactQuillDynamic;

export function Component_V3_TextEditorWithSticker({
  quillRef,
  data,
  onSetData,
}: {
  quillRef: React.MutableRefObject<any>;
  data: any;
  onSetData: (value: any) => void;
}) {
  return (
    <>
      <Paper p="sm" shadow="lg" mah={300} bg={MainColor.white}>
        <ScrollArea h={280}>
          <ReactQuill
            forwardedRef={quillRef}
            theme="snow"
            value={data}
            onChange={(val: any) => {
              onSetData(val);
            }}
            modules={modulesReactQuill}
            formats={formatsReactQuill}
            placeholder="Ketik pesan di sini atau tambahkan stiker..."
            style={{
              color: "black",
              backgroundColor: MainColor.white,
              border: "none",
            }}
          />
        </ScrollArea>
      </Paper>
    </>
  );
}
