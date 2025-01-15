"use client";

import { clientLogger } from "@/util/clientLogger";
import { Button, FileButton } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { AccentColor, MainColor } from "../color";
import { ComponentGlobal_NotifikasiPeringatan } from "../notif_global";

export function ComponentGlobal_ButtonUploadFileImage({
  onSetFile,
  onSetImage,
  text,
  icon,
  accept,
}: {
  onSetFile: File | null | any;
  onSetImage?: any | null;
  text?: string;
  icon?: string | any
  accept?: string;
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

          if (files.size > 100 * 1024 * 1024) {
            setIsLoading(false);
            ComponentGlobal_NotifikasiPeringatan("File terlalu besar");
            return
          }

          onSetFile(files);
          onSetImage(buffer);
        } catch (error) {
          clientLogger.error("Upload image error:", error);
        } finally {
          setIsLoading(false);
        }
      }}
      accept={accept ? accept : "image/png,image/png,image/jpeg,image/gif"}
    >
      {(props) => (
        <Button
          {...props}
          loading={isLoading}
          loaderPosition="center"
          radius={"xl"}
          style={{
            backgroundColor: MainColor.yellow,
            border: `1px solid ${AccentColor.yellow}`,
          }}
          leftIcon={icon ? icon : <IconUpload color="black" size={20} />}
          c={MainColor.darkblue}
        >
          {text ? text : "Upload"}
        </Button>
      )}
    </FileButton>
  );
}
