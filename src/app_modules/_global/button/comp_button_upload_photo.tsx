"use client";

import { clientLogger } from "@/util/clientLogger";
import { Button, FileButton } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import { MainColor } from "../color";

export function ComponentGlobal_ButtonUploadFileImage({
  onSetFile,
  onSetImage,
}: {
  onSetFile: File | any;
  onSetImage: any | null;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FileButton
      onChange={async (files: any | null) => {
        try {
          setIsLoading(true);
          const buffer = URL.createObjectURL(
            new Blob([new Uint8Array(await files.arrayBuffer())])
          );

          // if (files.size > MAX_SIZE) {
          //   ComponentGlobal_NotifikasiPeringatan(PemberitahuanMaksimalFile);
          //   return;
          // } else {
          // }
          onSetFile(files);
          onSetImage(buffer);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          clientLogger.error("Upload error:", error);
        }
      }}
      accept="image/png,image/jpeg"
    >
      {(props) => (
        <Button
          {...props}
          loading={isLoading}
          loaderPosition="center"
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
