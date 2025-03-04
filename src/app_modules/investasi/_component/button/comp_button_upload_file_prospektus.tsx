"use client";

import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import { Button, FileButton } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";

export function Investasi_ComponentButtonUploadFile({
  onSetFile,
  onSetImage,
  text,
  icon,
}: {
  onSetFile: File | null | any;
  onSetImage?: any | null;
  text?: string;
  icon?: string | any;
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
            return;
          }

          if (files.type !== "application/pdf") {
            setIsLoading(false);
            ComponentGlobal_NotifikasiPeringatan("Tipe file bukan PDF");
            return;
          }

          onSetFile(files);
          onSetImage(buffer);
        } catch (error) {
          clientLogger.error("Upload image error:", error);
        } finally {
          setIsLoading(false);
        }
      }}
      accept={"application/pdf"}
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
