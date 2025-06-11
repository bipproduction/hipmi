import { DIRECTORY_ID } from "@/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_InputCountDown,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import {
  AspectRatio,
  Button,
  Center,
  Image,
  Skeleton,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { donasi_funUpdateKabar } from "../../fun";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { clientLogger } from "@/util/clientLogger";
import SkeletonEditDonasi from "../../edit/edit_donasi/skeleton_edit_donasi";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetDonasiKabarById } from "../../lib/api_donasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function Donasi_ViewEditKabar() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<MODEL_DONASI_KABAR | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [isLoading, setLoading] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetDonasiKabarById({ id: id as string });
      // console.log("res >", response)
      if (response && response.success) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data kabar", error);
    }
  }

  async function onUpdate() {
    if (data?.title === "" || data?.deskripsi === "") {
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");
    }

    try {
      setLoading(true);
      if (file !== null) {
        const uploadImage = await funGlobal_UploadToStorage({
          file: file as File,
          dirId: DIRECTORY_ID.donasi_kabar,
        });

        if (!uploadImage.success) {
          setLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
          return;
        }

        const res = await donasi_funUpdateKabar({
          data: data as MODEL_DONASI_KABAR,
          fileId: uploadImage.data.id,
        });

        if (res.status === 200) {
          setLoading(false);

          if (data?.imageId !== null) {
            const deleteImage = await funGlobal_DeleteFileById({
              fileId: data?.imageId as string,
            });

            if (!deleteImage.success) {
              setLoading(false);
              clientLogger.error("Gagal hapus gambar lama");
            }
          }

          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          setLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      } else {
        const res = await donasi_funUpdateKabar({
          data: data as MODEL_DONASI_KABAR,
        });

        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          setLoading(false);
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update donasi", error);
    } finally {
      setLoading(false);
    }
  }

  if (!data) return <CustomSkeleton height={300} />;

  return (
    <>
      <Stack px={"lg"} pb={"lg"}>
        {isLoading ? (
          <SkeletonEditDonasi />
        ) : (
          <>
            <ComponentGlobal_BoxInformation informasi="Gambar tidak wajib di isi ! Hanya upload jika di butuhkan." />

            <TextInput
              maxLength={100}
              styles={{
                label: {
                  color: "white",
                },
              }}
              label="Judul"
              withAsterisk
              placeholder="Masukan judul kabar"
              value={data.title}
              onChange={(val) => {
                setData({
                  ...data,
                  title: val.target.value,
                });
              }}
            />
            <Textarea
              maxLength={1000}
              styles={{
                label: {
                  color: "white",
                },
              }}
              label="Deskripsi"
              withAsterisk
              placeholder="Masukan deskripsi kabar"
              autosize
              maxRows={10}
              minRows={2}
              value={data.deskripsi}
              onChange={(val) => {
                setData({
                  ...data,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              lengthInput={data.deskripsi.length}
              maxInput={1000}
            />

            <Stack spacing={5}>
              <ComponentGlobal_BoxUploadImage>
                {img ? (
                  <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                    <Image
                      style={{ maxHeight: 250 }}
                      alt="Foto"
                      height={250}
                      src={img}
                    />
                  </AspectRatio>
                ) : data.imageId === null ? (
                  <Stack justify="center" align="center" h={"100%"}>
                    <IconPhoto size={100} />
                  </Stack>
                ) : (
                  <Stack justify="center" align="center" h={"100%"} p={"sm"}>
                    <ComponentGlobal_LoadImageCustom
                      fileId={data.imageId}
                      height={200}
                    />
                  </Stack>
                )}
              </ComponentGlobal_BoxUploadImage>

              {/* Upload Foto */}
              <Center>
                <ComponentGlobal_ButtonUploadFileImage
                  onSetFile={setFile}
                  onSetImage={setImg}
                />
              </Center>
            </Stack>

            <Button
              style={{
                transition: "0.5s",
              }}
              disabled={_.values(data).includes("") ? true : false}
              radius={"xl"}
              mt={"lg"}
              bg={MainColor.yellow}
              color="yellow"
              c={"black"}
              loading={isLoading}
              loaderPosition="center"
              onClick={() => onUpdate()}
            >
              Simpan
            </Button>
          </>
        )}
      </Stack>
    </>
  );
}
