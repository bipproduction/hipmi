"use client";

import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_BoxUploadImage } from "@/app_modules/_global/component";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Stack,
} from "@mantine/core";
import { IconImageInPicture, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import fun_upload from "./fun_upload";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";

export default function Page() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Upload" />}
      >
        <Upload />
      </UIGlobal_LayoutTamplate>
    </>
  );
}

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function onUpload() {
    if (!file) return alert("File Kosong");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file as File);

      const uploadPhoto = await funGlobal_UploadToStorage({
        file: file,
        dirId: "cm5ohsepe002bq4nlxeejhg7q",
      });

      if (uploadPhoto.success) {
        setLoading(false);
        alert("berhasil upload");
        console.log("uploadPhoto", uploadPhoto);
      } else {
        setLoading(false);
        console.log("gagal upload", uploadPhoto);
      }
    } catch (error) {
      console.error("Error upload img:", error);
    }
  }

  return (
    <>
      <Stack>
        <ComponentGlobal_BoxUploadImage>
          {image ? (
            <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
              <Image style={{ maxHeight: 250 }} alt="Avatar" src={image} />
            </AspectRatio>
          ) : (
            <Center h={"100%"}>
              <IconImageInPicture size={50} />
            </Center>
          )}
        </ComponentGlobal_BoxUploadImage>

        <Center>
          <FileButton
            onChange={async (files: any | null) => {
              try {
                const buffer = URL.createObjectURL(
                  new Blob([new Uint8Array(await files.arrayBuffer())])
                );

                // if (files.size > MAX_SIZE) {
                //   ComponentGlobal_NotifikasiPeringatan(
                //     PemberitahuanMaksimalFile
                //   );
                //   return;
                // } else {

                // }

                console.log("ini buffer", buffer);

                setFile(files);
                setImage(buffer);
              } catch (error) {
                clientLogger.error("Upload error:", error);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                {...props}
                radius={"sm"}
                leftIcon={<IconUpload />}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
              >
                Upload
              </Button>
            )}
          </FileButton>
        </Center>

        <Button
          loaderPosition="center"
          loading={isLoading}
          onClick={() => {
            onUpload();
          }}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
