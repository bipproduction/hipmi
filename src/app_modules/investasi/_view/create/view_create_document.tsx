import { DIRECTORY_ID } from "@/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import {
  Box,
  Button,
  Center,
  Grid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCircleCheck, IconFileTypePdf } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funCreateDocument } from "../../_fun";

export function Investasi_ViewCreateDocument() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const router = useRouter();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  async function onCreate() {
    try {
      setIsLoading(true);
      const uploadFileDokumen = await funGlobal_UploadToStorage({
        file: filePdf as any,
        dirId: DIRECTORY_ID.investasi_dokumen,
      });

      if (!uploadFileDokumen.success) {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload file pdf");
        return;
      }

      const create = await investasi_funCreateDocument({
        data: {
          investasiId: investasiId,
          fileId: uploadFileDokumen.data.id,
          title: title,
        },
      });

      if (create.status !== 201) {
        setIsLoading(false);
        ComponentGlobal_NotifikasiPeringatan(create.message);
        return;
      }

      ComponentGlobal_NotifikasiBerhasil(create.message);
      router.back();
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error create document", error);
    }
  }

  return (
    <>
      <Stack spacing={"xl"}>
        <ComponentGlobal_BoxInformation informasi="File dokumen bersifat opsional, jika memang ada file yang bisa membantu meyakinkan investor. Anda bisa mengupload nya !" />

        <Stack>
          <TextInput
            withAsterisk
            label="Judul Dokumen"
            placeholder="Masukan judul dokumen"
            styles={{
              label: {
                color: "white",
              },
            }}
            onChange={(val) => setTitle(val.currentTarget.value)}
          />
          <ComponentGlobal_CardStyles marginBottom={"0px"}>
            {!filePdf ? (
              <Stack justify="center" align="center" h={"100%"}>
                <IconFileTypePdf size={40} color="gray" />
              </Stack>
            ) : (
              <Grid align="center">
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} align="center" color="white">
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
              accept="application/pdf"
              text="Upload Dokumen"
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
            loaderPosition="center"
            loading={isLoading}
            disabled={filePdf === null || title === ""}
            mt={50}
            radius={50}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            style={{
              transition: "0.5s",
              position: "absolute",
              bottom: 20,
              width: "90%",
            }}
            onClick={() => {
              onCreate();
            }}
          >
            Simpan
          </Button>
        </Box>
      </Stack>
    </>
  );
}
