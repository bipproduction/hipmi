import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_BoxInformation } from "@/app_modules/_global/component";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import {
  Avatar,
  Box,
  Button,
  Center,
  FileButton,
  Paper,
  Stack
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";

export default function Profile_ViewUploadFoto({
  imgPP,
  onSetImgPP,
  fotoProfileId,
  onSetFotoProfileId,
}: {
  imgPP: string | null | undefined;
  onSetImgPP: (img: string | null) => void;
  fotoProfileId: string;
  onSetFotoProfileId: (id: string) => void;
}) {
  const [isLoadingButton, setLoadingButton] = useState(false);

  return (
    <>
      <Box>
        <Stack spacing={"lg"}>
          <ComponentGlobal_BoxInformation informasi="Upload foto profile anda dengan ukuran maksimal file 3 MB." />
          <Center>
            {imgPP != undefined || imgPP != null ? (
              <Paper shadow="lg" radius={"100%"}>
                <Avatar
                  color={"cyan"}
                  sx={{
                    borderStyle: "solid",
                    borderColor: "gray",
                    borderWidth: "0.5px",
                  }}
                  src={imgPP}
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
                  setLoadingButton(true);
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );

                  // if (files.size > MAX_SIZE) {
                  //   ComponentGlobal_NotifikasiPeringatan(
                  //     PemberitahuanMaksimalFile
                  //   );
                  //   onSetImgPP(null);

                  //   return;
                  // }

                  if (fotoProfileId != "") {
                    try {
                      const deleteFotoProfile = await funGlobal_DeleteFileById({
                        fileId: fotoProfileId,
                        dirId: DIRECTORY_ID.profile_foto,
                      });

                      if (!deleteFotoProfile.success) {
                        clientLogger.error(
                          "Client failed delete photo profile:" +
                            deleteFotoProfile.message
                        );

                        return;
                      }

                      if (deleteFotoProfile.success) {
                        onSetFotoProfileId("");
                        onSetImgPP(null);

                        const uploadPhoto = await funGlobal_UploadToStorage({
                          file: files,
                          dirId: DIRECTORY_ID.profile_foto,
                        });

                        if (!uploadPhoto.success) {
                          clientLogger.error(
                            "Client failed upload photo profile::" +
                              uploadPhoto.message
                          );
                          return;
                        }

                        if (uploadPhoto.success) {
                          clientLogger.info(
                            "Client success upload foto profile"
                          );
                          onSetFotoProfileId(uploadPhoto.data.id);
                          onSetImgPP(buffer);
                        } else {
                          clientLogger.error(
                            "Client failed upload foto:",
                            uploadPhoto.message
                          );
                          ComponentGlobal_NotifikasiPeringatan(
                            "Gagal upload foto profile"
                          );
                        }
                      }
                    } catch (error) {
                      clientLogger.error("Client error upload foto:", error);
                    }
                  } else {
                    try {
                      const uploadPhoto = await funGlobal_UploadToStorage({
                        file: files,
                        dirId: DIRECTORY_ID.profile_foto,
                      });

                      if (uploadPhoto.success) {
                        clientLogger.info("Client success upload foto profile");
                        onSetFotoProfileId(uploadPhoto.data.id);
                        onSetImgPP(buffer);
                      } else {
                        clientLogger.error(
                          "Client failed upload foto:",
                          uploadPhoto.message
                        );
                        ComponentGlobal_NotifikasiPeringatan(
                          "Gagal upload foto profile"
                        );
                      }
                    } catch (error) {
                      clientLogger.error("Client error upload foto:", error);
                    }
                  }
                } catch (error) {
                  clientLogger.error("Client error upload foto:", error);
                } finally {
                  setLoadingButton(false);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  {...props}
                  loading={isLoadingButton}
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
