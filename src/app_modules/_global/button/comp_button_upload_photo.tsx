"use client";

import { Button, FileButton } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { MainColor } from "../color";

export function ComponentGlobal_ButtonUploadFileImage({
  onSetFile,
  onSetImage,
}: {
  onSetFile: File | any;
  onSetImage: any | null;
}) {
  return (
    <FileButton
      onChange={async (files: any | null) => {
        try {
          const buffer = URL.createObjectURL(
            new Blob([new Uint8Array(await files.arrayBuffer())])
          );

          onSetFile(files);
          onSetImage(buffer);
        } catch (error) {
          console.log(error);
        }
      }}
      accept="image/png,image/jpeg"
    >
      {(props) => (
        <Button
          {...props}
          radius={"xl"}
          leftIcon={<IconCamera />}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Upload
        </Button>
      )}
    </FileButton>
  );
}
