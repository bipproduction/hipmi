"use client";

import { DIRECTORY_ID } from "@/lib";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Image,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _, { set } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Donasi_funUpdateDonasi } from "../../fun/update/fun_update_donasi";
import { MODEL_DONASI, MODEL_DONASI_ALL_MASTER } from "../../model/interface";

export default function EditDonasi({
  dataDonasi,
  masterKategori,
  masterDurasi,
}: {
  dataDonasi: MODEL_DONASI;
  masterKategori: MODEL_DONASI_ALL_MASTER[];
  masterDurasi: MODEL_DONASI_ALL_MASTER[];
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(dataDonasi);
  const [kategori, setKategori] = useState(masterKategori);
  const [durasi, setDurasi] = useState(masterDurasi);
  const [file, setFile] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<any | null>();
  const [newTarget, setNewTarget] = useState("");

  async function onUpdate() {
    setLoading(true);
    const body = {
      id: data.id,
      donasiMaster_KategoriId: data.DonasiMaster_Ketegori.id,
      donasiMaster_DurasiId: data.DonasiMaster_Durasi.id,
      title: data.title,
      target: data.target,
    };

    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapin Data");

    try {
      if (file !== null) {
        const uploadImage = await funGlobal_UploadToStorage({
          file: file as File,
          dirId: DIRECTORY_ID.donasi_image,
        });
        if (!uploadImage.success) {
          setLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
        }

        const deleteImage = await funGlobal_DeleteFileById({
          fileId: data.imageId,
        });
        if (!deleteImage.success) {
          setLoading(false);
          ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar lama");
        }

        const res = await Donasi_funUpdateDonasi({
          data: body as any,
          fileId: uploadImage.data.id,
        });
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
          setLoading(false);
        } else {
          ComponentGlobal_NotifikasiPeringatan(res.message);
          setLoading(false);
        }
      } else {
        const res = await Donasi_funUpdateDonasi({
          data: body as any,
        });
        if (res.status === 200) {
          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
          setLoading(false);
        } else {
          ComponentGlobal_NotifikasiPeringatan(res.message);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Stack spacing={"md"} px={"sm"}>
        <Select
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Kategori"
          placeholder="Pilih kategori penggalangan dana"
          value={data.DonasiMaster_Ketegori.id}
          withAsterisk
          data={kategori.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val) =>
            setData({
              ...(data as any),
              DonasiMaster_Ketegori: {
                id: val,
              },
            })
          }
        />

        <Stack>
          <ComponentGlobal_BoxUploadImage>
            {updateImage ? (
              <AspectRatio ratio={1 / 1} mt={5} maw={300} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250 }}
                  alt="Foto"
                  height={250}
                  src={updateImage}
                />
              </AspectRatio>
            ) : (
              <Stack align="center" justify="center" p={"xs"} h={"100%"}>
                <ComponentGlobal_LoadImageCustom
                  fileId={data.imageId}
                  height={200}
                />
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

                  setUpdateImage(buffer);
                  setFile(files);
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

        <Stack>
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Judul Donasi"
            placeholder="Contoh: Renovasi Masjid pada kampung, dll"
            value={data.title}
            maxLength={100}
            error={
              data.title === "" ? (
                <ComponentGlobal_ErrorInput text="Masukan judul" />
              ) : (
                ""
              )
            }
            onChange={(val) =>
              setData({
                ...data,
                title: val.target.value,
              })
            }
          />

          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            icon={<Text fw={"bold"}>Rp.</Text>}
            min={0}
            withAsterisk
            label="Target Dana"
            placeholder="0"
            value={newTarget ? newTarget : data.target}
            error={
              data.target === "" || data.target === "0" ? (
                <ComponentGlobal_ErrorInput text="Masukan target dana" />
              ) : (
                ""
              )
            }
            onChange={(val) => {
              const match = val.currentTarget.value
                .replace(/\./g, "")
                .match(/^[0-9]+$/);

              if (val.currentTarget.value === "") {
                setData({
                  ...data,
                  target: 0 + "",
                });
                setNewTarget("0");
              }

              if (!match?.[0]) return null;

              const nilai = val.currentTarget.value.replace(/\./g, "");
              const target = Intl.NumberFormat("id-ID").format(+nilai);

              setNewTarget(target);

              setData({
                ...data,
                target: nilai,
              });
            }}
          />
          <Select
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Durasi"
            placeholder="Jangka waktu penggalangan dana"
            withAsterisk
            value={data.DonasiMaster_Durasi.id}
            data={durasi.map((e) => ({
              value: e.id,
              label: e.name + " " + `hari`,
            }))}
            onChange={(val) =>
              setData({
                ...(data as any),
                DonasiMaster_Durasi: {
                  id: val,
                },
              })
            }
          />
        </Stack>
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={data.title === "" || data.target === "0" ? true : false}
          loaderPosition="center"
          loading={isLoading ? true : false}
          my={"lg"}
          radius={"xl"}
          onClick={() => {
            onUpdate();
            // console.log(data);
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
