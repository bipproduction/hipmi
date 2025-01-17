import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  Box,
  Button,
  Center,
  Grid,
  Stack,
  Text
} from "@mantine/core";
import {
  IconCircleCheck,
  IconFileTypePdf
} from "@tabler/icons-react";

import { DIRECTORY_ID } from "@/app/lib";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Investasi_SkeletonEditProspektus } from "../../_component/skeleton_view";
import { investasi_funUpdateProspektus } from "../../_fun";
import { apiGetOneInvestasiById } from "../../_lib/api_interface";

export function Investasi_ViewEditProspektus() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;
  const router = useRouter();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileRemoveId, setFileRemoveId] = useState<string | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneInvestasiById({
        id: investasiId,
      });
      if (respone.success) {
        setFileRemoveId(respone.data.prospektusFileId);
      }
    } catch (error) {
      clientLogger.error("Error get data investasi:", error);
    }
  }

  async function onUpload() {
    try {
      setIsLoading(true);
      const uploadFilePdf = await funGlobal_UploadToStorage({
        file: filePdf as any,
        dirId: DIRECTORY_ID.investasi_prospektus,
      });

      if (!uploadFilePdf.success) {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload file pdf");
        return;
      }

      const deleteFile = await funGlobal_DeleteFileById({
        fileId: fileRemoveId as string,
        dirId: DIRECTORY_ID.investasi_prospektus,
      });

      if (!deleteFile.success) {
        setIsLoading(false);
        clientLogger.error("Error delete file:", deleteFile.message);
      }

      const updte = await investasi_funUpdateProspektus({
        fileId: uploadFilePdf.data.id,
        investasiId: investasiId,
      });

      if (updte.status !== 200) {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal update prospektus");
        return;
      }

      ComponentGlobal_NotifikasiBerhasil(updte.message);
      router.back();
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error update prospektus:", error);
    }
  }

  if (fileRemoveId == null) {
    return <Investasi_SkeletonEditProspektus />;
  }

  return (
    <>
      <Stack spacing={"sm"}>
        <ComponentGlobal_BoxInformation informasi="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepan." />
        <ComponentGlobal_CardStyles marginBottom={"0px"}>
          {!filePdf ? (
            <Stack justify="center" align="center" h={"100%"}>
              <IconFileTypePdf size={40} color="gray" />
            </Stack>
          ) : (
            <Grid align="center">
              <Grid.Col span={2}></Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1} align="center">
                  {filePdf.name}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center>
                  <IconCircleCheck color="green" />
                </Center>
              </Grid.Col>
            </Grid>
          )}
        </ComponentGlobal_CardStyles>

        <Center>
          <ComponentGlobal_ButtonUploadFileImage
            onSetFile={setFilePdf}
            accept={"application/pdf"}
            text="Upload File"
          />
        </Center>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            px={"sm"}
            loaderPosition="center"
            loading={isLoading}
            disabled={filePdf === null}
            mt={50}
            radius={50}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            style={{
              transition: "all 0.3s ease",
              position: "absolute",
              bottom: 20,
              width: "90%",
            }}
            onClick={() => {
              onUpload();
            }}
          >
            Update
          </Button>
        </Box>
      </Stack>
    </>
  );
}
