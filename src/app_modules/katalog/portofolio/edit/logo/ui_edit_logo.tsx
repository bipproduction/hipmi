"use client";

import {
  AccentColor
} from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import { Center, Image, Paper, Stack } from "@mantine/core";
import { useState } from "react";
import { ComponentPortofolio_ButtonEditLogoBisnis } from "../../component";
import { MODEL_PORTOFOLIO } from "../../model/interface";

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
        <Stack>
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
            {img ? (
              <Image maw={250} alt="Image" src={img} />
            ) : (
              <ComponentGlobal_LoadImage fileId={dataPorto.logoId} />
            )}
          </Paper>
          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFile}
              onSetImage={setImg}
            />
          </Center>
        </Stack>
        <ComponentPortofolio_ButtonEditLogoBisnis
          file={file as any}
          portofolioId={dataPorto.id}
          fileRemoveId={dataPorto.logoId}
        />
      </Stack>
    </>
  );
}
