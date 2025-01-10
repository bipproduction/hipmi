import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
} from "@/app_modules/_global/component";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Stack,
  Text
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useState } from "react";

export default function Profile_ViewUploadBackground({
  imgBG,
  onSetImgBG,
  backgroundProfileId,
  onSetBackgroundProfileId,
}: {
  imgBG: string;
  onSetImgBG: (img: string | null) => void;
  backgroundProfileId: string;
  onSetBackgroundProfileId: (id: string) => void;
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
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
                  src={imgBG}
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
                  setLoading(true);
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );

                  // if (files.size > MAX_SIZE) {
                  //   ComponentGlobal_NotifikasiPeringatan(
                  //     PemberitahuanMaksimalFile
                  //   );
                  //   onSetImgBG(null);

                  //   return;
                  // }

                  if (backgroundProfileId != "") {
                    const deleteFotoBg = await funGlobal_DeleteFileById({
                      fileId: backgroundProfileId,
                      dirId: DIRECTORY_ID.profile_background,
                    });

                    if (!deleteFotoBg.success) {
                      clientLogger.error(
                        "Client failed delete background:" +
                          deleteFotoBg.message
                      );
                      return;
                    }

                    if (deleteFotoBg.success) {
                      onSetBackgroundProfileId("");
                      onSetImgBG(null);

                      const uploadBackground = await funGlobal_UploadToStorage({
                        file: files,
                        dirId: DIRECTORY_ID.profile_background,
                      });

                      if (!uploadBackground.success) {
                        clientLogger.error(
                          "Client failed upload background:" +
                            uploadBackground.message
                        );
                        return;
                      }

                      if (uploadBackground.success) {
                        onSetBackgroundProfileId(uploadBackground.data.id);
                        onSetImgBG(buffer);
                      } else {
                        ComponentGlobal_NotifikasiPeringatan(
                          "Gagal upload background profile"
                        );
                      }
                    }
                  } else {
                    const uploadBackground = await funGlobal_UploadToStorage({
                      file: files,
                      dirId: DIRECTORY_ID.profile_background,
                    });

                    if (uploadBackground.success) {
                      onSetBackgroundProfileId(uploadBackground.data.id);
                      onSetImgBG(buffer);
                    } else {
                      ComponentGlobal_NotifikasiPeringatan(
                        "Gagal upload background profile"
                      );
                    }
                  }
                } catch (error) {
                  clientLogger.error("Client error upload background:", error);
                } finally {
                  setLoading(false);
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
          </Center>
        </Stack>
      </Box>
    </>
  );
}
