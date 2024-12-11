"use client";

import { APIs } from "@/app/lib";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";
import { Button, Center, FileButton, Image, Paper, Stack } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import { MODEL_PORTOFOLIO } from "../../model/interface";
import { ComponentPortofolio_ButtonEditLogoBisnis } from "../../component";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";

export default function Portofolio_EditLogoBisnis({
  dataPorto,
}: {
  dataPorto: MODEL_PORTOFOLIO;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);

  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        <Paper
          p={"sm"}
          style={{
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px ",
            padding: "15px",
            color: "white",
          }}
        >
          <Stack align="center">
            {img ? (
              <Image maw={250} alt="Image" src={img} />
            ) : (
              <ComponentGlobal_LoadImage fileId={dataPorto.logoId} />
            )}

            <Center>
              <FileButton
                onChange={async (files: any | null) => {
                  try {
                    const buffer = URL.createObjectURL(
                      new Blob([new Uint8Array(await files.arrayBuffer())])
                    );

                    if (files.size > MAX_SIZE) {
                      ComponentGlobal_NotifikasiPeringatan(
                        PemberitahuanMaksimalFile
                      );
                    } else {
                      setImg(buffer);
                      setFile(files);
                    }
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
            </Center>
          </Stack>
        </Paper>
        <ComponentPortofolio_ButtonEditLogoBisnis
          file={file as any}
          portofolioId={dataPorto.id}
        />
      </Stack>
    </>
  );
}
