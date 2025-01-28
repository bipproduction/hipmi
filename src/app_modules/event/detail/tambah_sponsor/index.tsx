"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import Event_CreateSponsor from "@/app_modules/event/component/detail/create_sponsor";
import {
  Stack,
  Box,
  AspectRatio,
  Group,
  Button,
  TextInput,
  Title,
  Loader,
  Image,
  Center,
  Text,
} from "@mantine/core";
import { IconPhoto, IconCamera, IconFileTypePdf } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { apiGetEventCreateSponsor } from "../../_lib/api_event";
import { clientLogger } from "@/util/clientLogger";
import { funUploadFileToStorage } from "@/app_modules/_global/fun/upload/fun_upload_to_storage";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { DIRECTORY_ID } from "@/app/lib";
import { IEventSponsor } from "../../_lib/interface";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";

function Event_TambahSponsor() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");

  async function onCreated() {
    if (!file) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const uploadFile = await funUploadFileToStorage({
        file: file,
        dirId: DIRECTORY_ID.event_sponsor,
      });

      if (!uploadFile.success) {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload file");
        return;
      }

      const fileType = file.type.split("/").pop();
      const data: IEventSponsor = {
        name: name,
        fileName: file.name,
        fileExt: fileType,
        fileId: uploadFile.data.id,
      };

      const created: any = await apiGetEventCreateSponsor({
        id: params.id,
        data: data,
      });

      console.log("res >>", created);

      if (created) {
        router.replace(RouterEvent.nominal_sponsor({ id: params.id }));
        ComponentGlobal_NotifikasiBerhasil(created.message);
      } else {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan(created.message);
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error create sponsor", error);
    }
  }

  return (
    <>
      <Stack spacing={"md"} px={"xs"}>
        <Box mb={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Upload file berformat pdf atau file gambar untuk logo sponsor anda." />
        </Box>

        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
            required: {
              color: MainColor.red,
            },
            input: {
              backgroundColor: MainColor.white,
            },
          }}
          withAsterisk
          label="Nama Sponsor"
          placeholder="Masukan nama sponsor"
          onChange={(e) => setName(e.target.value)}
        />

        {/* <ComponentGlobal_BoxUploadImage>
          {isLoadingImg ? (
            <Stack justify="center" align="center" h={"100%"}>
              <Loader size={150} color="yellow" />
            </Stack>
          ) : img ? (
            <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
              <Image
                style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                alt="Foto"
                height={250}
                src={URL.createObjectURL(img)}
              />
            </AspectRatio>
          ) : (
            <Stack justify="center" align="center" h={"100%"}>
              <IconPhoto size={150} color="gray" />
            </Stack>
          )}
        </ComponentGlobal_BoxUploadImage> */}

        <Stack spacing={0}>
          <ComponentGlobal_CardStyles marginBottom={0}>
            <Center>
              {file ? (
                <Text>{file.name}</Text>
              ) : (
                <Group>
                  <IconFileTypePdf size={50} /> . <IconPhoto size={50} />
                </Group>
              )}
            </Center>
          </ComponentGlobal_CardStyles>

          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFile}
              accept="image/jpeg,image/png,application/pdf"
            />
          </Center>
        </Stack>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              transition: "all 0.3s ease",
              position: "absolute",
              bottom: 20,
              width: "90%",
            }}
            disabled={file == null || name == ""}
            loading={isLoading ? true : false}
            loaderPosition="center"
            radius={"xl"}
            onClick={() => {
              onCreated();
            }}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
          >
            Simpan
          </Button>
        </Box>

        {/* <Stack mt={30}>
          <Button
            mt={90}
            mb={20}
            radius={"xl"}
            color="yellow"
            c={"black"}
            bg={MainColor.yellow}
            onClick={() =>
              router.replace("/dev/event/detail/sponsor/nominal_sponsor")
            }
          >
            Simpan
          </Button>
        </Stack> */}
      </Stack>

      {/* <Event_CreateSponsor />  */}
    </>
  );
}

export default Event_TambahSponsor;
