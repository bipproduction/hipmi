import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import { Avatar, Box, Center, Paper, Stack } from "@mantine/core";
import { useState } from "react";

export default function Profile_ViewUploadFoto({
  imgPP,
  onSetImgPP,
  filePP,
  onSetFilePP,
}: {
  imgPP: string | null | undefined;
  onSetImgPP: (img: string | null) => void;
  filePP: File | null;
  onSetFilePP: (file: File | null) => void;
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Box>
        <Stack spacing={"lg"}>
          <ComponentGlobal_BoxInformation informasi="Upload foto profile anda." />
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
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={onSetFilePP}
              onSetImage={onSetImgPP}
            />
          </Center>
        </Stack>
      </Box>
    </>
  );
}
