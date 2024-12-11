"use client";

import { MainColor } from "@/app_modules/_global/color";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Coba_TestLoading from "@/app_modules/zCoba";
import {
  Avatar,
  Button,
  Center,
  FileButton,
  Paper,
  Stack,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import { DIRECTORY_ID } from "../lib";
import { TokenStorage } from "../lib/token";
import { envs } from "@/lib/envs";

export default function Page() {
  const [filePP, setFilePP] = useState<File | null>(null);
  const [imgPP, setImgPP] = useState<any | null>();

  async function onSave() {
    const body = {
      file: filePP,
      dirId: DIRECTORY_ID.profile_foto,
    };

    const token =
      "QWERTYUIOPLKJHGFDSAZXCVBNMQAZWSXEDCRFVTGBYHNUJMIKOLPPOIUYTREWQLKJHGFDSAMNBVCXZlghvftyguhijknhbgvcfytguu8okjnhbgvfty7u8oilkjnhgvtygu7u8ojilnkhbgvhujnkhghvjhukjnhb";

    const formData = new FormData();
    formData.append("file", filePP as any);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log(await res.json());
  }

  return (
    <>
      <Stack>
        <Center>
          {imgPP ? (
            <Paper shadow="lg" radius={"100%"}>
              <Avatar
                color={"cyan"}
                sx={{
                  borderStyle: "solid",
                  borderColor: "gray",
                  borderWidth: "0.5px",
                }}
                src={imgPP ? imgPP : "/aset/global/avatar.png"}
                size={150}
                radius={"100%"}
              />
            </Paper>
          ) : (
            <Paper shadow="lg" radius={"100%"}>
              <Avatar
                variant="light"
                color="blue"
                size={150}
                radius={"100%"}
                sx={{
                  borderStyle: "solid",
                  borderColor: MainColor.darkblue,
                  borderWidth: "0.5px",
                }}
              />
            </Paper>
          )}
        </Center>

        <FileButton
          onChange={async (files: any | null) => {
            try {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await files.arrayBuffer())])
              );
              setImgPP(buffer);
              setFilePP(files);
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

        <Button onClick={() => onSave()}>Upload</Button>
      </Stack>
    </>
  );
}
