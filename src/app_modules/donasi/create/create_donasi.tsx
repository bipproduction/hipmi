"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Button,
  FileButton,
  Group,
  Image,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { DIRECTORY_ID } from "@/lib";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_BoxUploadImage } from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import _ from "lodash";
import { useState } from "react";
import Donasi_funCreateTemporary from "../fun/create/fun_create_donasi_temporary";
import { gs_donasi_tabs_posting } from "../global_state";
import { MODEL_DONASI_ALL_MASTER } from "../model/interface";

export default function CreateDonasi({
  masterKategori,
  masterDurasi,
}: {
  masterKategori: MODEL_DONASI_ALL_MASTER[];
  masterDurasi: MODEL_DONASI_ALL_MASTER[];
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [kategori, setKategori] = useState(masterKategori);
  const [durasi, setDurasi] = useState(masterDurasi);
  const [data, setData] = useState({
    kategoriId: "",
    title: "",
    target: "",
    durasiId: "",
  });
  const [targetDana, setTargetDana] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  async function onCreate() {
    const body = {
      donasiMaster_KategoriId: data.kategoriId,
      donasiMaster_DurasiId: data.durasiId,
      title: data.title,
      target: targetDana,
    };

    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapin Data");

    try {
      setLoading(true);

      const uploadImage = await funGlobal_UploadToStorage({
        file: file as File,
        dirId: DIRECTORY_ID.donasi_image,
      });
      if (!uploadImage.success) {
        setLoading(false);
        return ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
      }

      const res = await Donasi_funCreateTemporary({
        data: body as any,
        fileId: uploadImage.data.id,
      });
      if (res.status === 201) {
        setTabsPostingDonasi("Review");
        router.push(RouterDonasi.create_cerita_penggalang + `${res.donasiId}`);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Stack spacing={"md"} px={"xl"}>
        <ComponentGlobal_BoxInformation informasi="Lengkapi semua data di bawah untuk selanjutnya mengisi cerita Penggalangan Dana!" />
        <Select
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Kategori"
          placeholder="Pilih kategori penggalangan dana"
          withAsterisk
          data={kategori.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(val: string) =>
            setData({
              ...data,
              kategoriId: val,
            })
          }
        />

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
            maxLength={100}
            onChange={(val) => {
              setData({ ...data, title: val.target.value });
            }}
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
            value={data.target}
            onChange={(val) => {
              // console.log(val.currentTarget.value, "nilai");
              const match = val.currentTarget.value
                .replace(/\./g, "")
                .match(/^[0-9]+$/);

              if (val.currentTarget.value === "")
                return setData({
                  ...data,
                  target: 0 + "",
                });
              if (!match?.[0]) return null;

              const nilai = val.currentTarget.value.replace(/\./g, "");
              const target = Intl.NumberFormat("id-ID").format(+nilai);

              setTargetDana(nilai);
              setData({
                ...data,
                target,
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
            data={durasi.map((e) => ({
              value: e.id,
              label: e.name + " " + `hari`,
            }))}
            onChange={(val: string) => setData({ ...data, durasiId: val })}
          />
        </Stack>

        <Stack>
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
            ) : (
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="white" />
                <Text fz={10} fs={"italic"} c={"white"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            )}
          </ComponentGlobal_BoxUploadImage>

          {/* Upload Foto */}
          <Group position="center">
            <FileButton
              onChange={async (files: any) => {
                try {
                  const buffer = URL.createObjectURL(
                    new Blob([new Uint8Array(await files.arrayBuffer())])
                  );
                  setImg(buffer);
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
                  leftIcon={<IconCamera color="black" />}
                  radius={50}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                >
                  Upload Gambar
                </Button>
              )}
            </FileButton>
          </Group>
        </Stack>

        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={_.values(data).includes("") || file === null ? true : false}
          loaderPosition="center"
          loading={isLoading ? true : false}
          my={"lg"}
          radius={"xl"}
          onClick={() => onCreate()}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Selanjutnya
        </Button>
      </Stack>
    </>
  );
}
