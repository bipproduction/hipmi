import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import {
  AspectRatio,
  Box,
  Center,
  Image,
  Stack
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useState } from "react";

export default function Profile_ViewUploadBackground({
  imgBG,
  onSetImgBG,
  fileBG,
  onSetFileBG,
}: {
  imgBG: string;
  onSetImgBG: (img: string | null) => void;
  fileBG: File | null;
  onSetFileBG: (file: File | null) => void;
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
                <IconPhoto size={100} />
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={onSetFileBG}
              onSetImage={onSetImgBG}
            />
          </Center>
        </Stack>
      </Box>
    </>
  );
}
