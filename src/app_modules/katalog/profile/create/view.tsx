"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ErrorInput,
} from "@/app_modules/_global/component";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCamera, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { gmailRegex } from "../../component/regular_expressions";
import { Profile_ComponentCreateNewProfile } from "../_component";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";

export default function CreateProfile() {
  const [filePP, setFilePP] = useState<File | null>(null);
  const [imgPP, setImgPP] = useState<any | null>();
  const [fileBG, setFileBG] = useState<File | null>(null);
  const [imgBG, setImgBG] = useState<any | null>();

  const [value, setValue] = useState({
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  return (
    <>
      <Stack px={"sm"} spacing={40}>
        <Box>
          <Stack spacing={"lg"}>
            <ComponentGlobal_BoxInformation informasi="Upload foto profile anda." />
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
                      setImgPP(buffer);
                      setFilePP(files);
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
        </Box>

        <Box>
          <Stack spacing={"lg"}>
            <ComponentGlobal_BoxInformation informasi="Upload foto latar belakang profile anda." />
            <ComponentGlobal_BoxUploadImage>
              {imgBG ? (
                <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                  <Image
                    style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                    alt="Foto"
                    height={250}
                    src={imgBG ? imgBG : "/aset/no-img.png"}
                  />
                </AspectRatio>
              ) : (
                <Stack justify="center" align="center" h={"100%"}>
                  <IconUpload color="white" />
                  <Text fz={"xs"} c={"white"}>
                    Upload Background
                  </Text>
                </Stack>
              )}
            </ComponentGlobal_BoxUploadImage>

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
                      setImgBG(buffer);
                      setFileBG(files);
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
        </Box>

        <Stack mb={"lg"}>
          <TextInput
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            label={"Nama"}
            maxLength={50}
            placeholder="Nama lengkap"
            onChange={(val) => {
              setValue({
                ...value,
                name: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            icon={<IconAt size={15} />}
            label="Email"
            maxLength={100}
            placeholder="Contoh: User@gmail.com"
            error={
              value.email.length > 0 && !value.email.match(gmailRegex) ? (
                <ComponentGlobal_ErrorInput text="Invalid Email" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              setValue({
                ...value,
                email: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            label="Alamat"
            maxLength={100}
            placeholder="Alamat lengkap"
            onChange={(val) => {
              setValue({
                ...value,
                alamat: val.target.value,
              });
            }}
          />

          <Select
            styles={{
              label: { color: "white" },
            }}
            withAsterisk
            label="Jenis Kelamin"
            placeholder="Pilih satu"
            data={[
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
            onChange={(val) => {
              setValue({
                ...value,
                jenisKelamin: val as string,
              });
            }}
          />

          <Profile_ComponentCreateNewProfile
            value={value as any}
            filePP={filePP as any}
            fileBG={fileBG as any}
          />
        </Stack>
      </Stack>
    </>
  );
}
