"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { notifikasiToUser_CreateKabarDonasi } from "@/app_modules/notifikasi/fun/create/create_notif_to_user_kabar_donasi";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Button,
  Center,
  Image,
  Stack,
  TextInput,
  Textarea
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Donasi_funCreateKabar } from "../../fun/create/fun_create_kabar";

export default function Donasi_CreateKabar() {
  const params = useParams<{ id: string }>();
  const donasiId = params.id;

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [kabar, setKabar] = useState({
    judul: "",
    deskripsi: "",
  });

  const [isLoading, setLoading] = useState(false);

  async function onSave() {
    const body = {
      donasiId: donasiId,
      title: kabar.judul,
      deskripsi: kabar.deskripsi,
    };

    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

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

        const res = await Donasi_funCreateKabar({
          data: body as any,
          fileId: uploadImage.data.id,
        });

        if (res.status === 200) {
          await notifikasiToUser_CreateKabarDonasi({
            donasiId: donasiId,
            kabarId: res.kabarId as any,
          });

          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
          setLoading(false);
        }
      } else {
        const res = await Donasi_funCreateKabar({
          data: body as any,
        });

        if (res.status === 200) {
          await notifikasiToUser_CreateKabarDonasi({
            donasiId: donasiId,
            kabarId: res.kabarId as any,
          });

          ComponentGlobal_NotifikasiBerhasil(res.message);
          router.back();
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error upload berita", error);
    }
  }

  return (
    <>
      <Stack px={"lg"} pb={"lg"}>
        <ComponentGlobal_BoxInformation informasi="Upload gambar bersifat opsional untuk melengkapi kabar terkait donasi Anda." />

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
          onChange={(val) => {
            setKabar({
              ...kabar,
              judul: _.startCase(val.target.value),
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
          onChange={(val) => {
            setKabar({
              ...kabar,
              deskripsi: val.target.value,
            });
          }}
        />
        <ComponentGlobal_InputCountDown
          lengthInput={kabar.deskripsi.length}
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
            ) : (
              <Stack justify="center" align="center" h={"100%"}>
                <IconPhoto size={100} />
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
          disabled={_.values(kabar).includes("") ? true : false}
          radius={"xl"}
          mt={"lg"}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          loading={isLoading}
          loaderPosition="center"
          onClick={() => onSave()}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}

interface Model_Kabar {
  judul: string;
  deskripsi: string;
}
