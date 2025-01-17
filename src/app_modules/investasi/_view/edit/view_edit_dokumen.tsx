import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_CardStyles,
} from "@/app_modules/_global/component";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
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
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck } from "@tabler/icons-react";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Investasi_SkeletonEditProspektus } from "../../_component/skeleton_view";
import { investasi_funUpdateDocument } from "../../_fun";
import { apiGetDokumenInvestasiById } from "../../_lib/api_interface";
import { MODEL_INVESTASI_DOKUMEN } from "../../_lib/interface";

export function Investasi_ViewEditDokumen() {
  const params = useParams<{ id: string }>();
  const dokumenId = params.id;

  const router = useRouter();
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI_DOKUMEN | null>(null);
  // const [title, setTitle] = useState(data.title);
  const [loading, setLoading] = useState(true);

  useShallowEffect(() => {
    onGetDataDokumenById();
  }, []);

  async function onGetDataDokumenById() {
    try {
      setLoading(true);
      const response = await apiGetDokumenInvestasiById({
        id: dokumenId,
      });
      if (response.success) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate() {
    try {
      setIsLoading(true);
      if (filePdf) {
        const uploadFile = await funGlobal_UploadToStorage({
          file: filePdf,
          dirId: DIRECTORY_ID.investasi_dokumen,
        });

        if (!uploadFile.success) {
          setIsLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal upload file dokumen");
          return;
        }

        const delfile = await funGlobal_DeleteFileById({
          fileId: data?.fileId as any,
          dirId: DIRECTORY_ID.investasi_dokumen,
        });

        if (!delfile.success) {
          setIsLoading(false);
          clientLogger.error("Gagal hapus file lama", delfile.message);
        }

        const updateWithFile = await investasi_funUpdateDocument({
          data: data as any,
          fileId: uploadFile.data.id,
        });

        if (updateWithFile.status !== 200) {
          setIsLoading(false);
          ComponentGlobal_NotifikasiPeringatan(updateWithFile.message);
        }

        ComponentGlobal_NotifikasiBerhasil(updateWithFile.message);
        router.back();
      } else {
        const updateNoFile = await investasi_funUpdateDocument({
          data: data as any,
        });

        if (updateNoFile.status !== 200) {
          setIsLoading(false);
          ComponentGlobal_NotifikasiPeringatan(updateNoFile.message);
        }
        ComponentGlobal_NotifikasiBerhasil(updateNoFile.message);
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error(" Error update dokumen", error);
    }
  }

  if (loading) {
    return <Investasi_SkeletonEditProspektus />;
  }

  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        {/* <ComponentGlobal_BoxInformation informasi="File dokumen bersifat opsional, jika memang ada file yang bisa membantu meyakinkan investor. Anda bisa mengupload nya disini !" /> */}

        <Stack>
          <TextInput
            label="Judul Dokumen"
            placeholder="Masukan judul dokumen"
            value={data?.title}
            styles={{
              label: {
                color: "white",
              },
            }}
            onChange={(val) =>
              setData({
                ...(data as any),
                title: val.target.value,
              })
            }
          />
          <ComponentGlobal_CardStyles marginBottom={"0px"}>
            {!filePdf ? (
              <Text lineClamp={1} align="center" c={"gray"}>
                {_.startCase(data?.title)}.pdf
              </Text>
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
              text="Upload dokumen"
            />
          </Center>

          {/* <Group position="center">
            <FileButton
              accept={"application/pdf"}
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );

                  setFilePdf(files);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {(props) => (
                <Button
                  leftIcon={<IconCamera />}
                  {...props}
                  radius={"xl"}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload Dokumen
                </Button>
              )}
            </FileButton>
          </Group> */}
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
            disabled={data?.title === ""}
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
              onUpdate();
            }}
          >
            Update
          </Button>
        </Box>
      </Stack>
    </>
  );
}
