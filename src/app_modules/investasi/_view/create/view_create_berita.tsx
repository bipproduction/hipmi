import { DIRECTORY_ID } from "@/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
  ComponentGlobal_InputCountDown,
} from "@/app_modules/_global/component";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import {
  AspectRatio,
  Button,
  Center,
  Image,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Prisma } from "@prisma/client";
import { IconPhoto } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funCreateBerita } from "../../_fun";

export function Investasi_ViewCreateBerita() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<Prisma.BeritaInvestasiCreateArgs>({
    data: {
      title: "",
      deskripsi: "",
      investasiId: investasiId,
    },
  });

  async function onCreate() {
    try {
      setIsLoading(true);
      if (file != null) {
        const uploadFile = await funGlobal_UploadToStorage({
          file: file as File,
          dirId: DIRECTORY_ID.investasi_berita,
        });

        if (!uploadFile.success) {
          ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
          return;
        }

        const createWithFile = await investasi_funCreateBerita({
          data: data.data as any,
          fileId: uploadFile.data.id,
        });

        if (createWithFile.status === 201) {
          ComponentGlobal_NotifikasiBerhasil(createWithFile.message);
          router.back();
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(createWithFile.message);
        }
      } else {
        const createNoFile = await investasi_funCreateBerita({
          data: data.data as any,
        });

        if (createNoFile.status === 201) {
          ComponentGlobal_NotifikasiBerhasil(createNoFile.message);
          router.back();
        } else {
          setIsLoading(false);
          ComponentGlobal_NotifikasiGagal(createNoFile.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      clientLogger.error("Error create news", error);
    }
  }

  return (
    <>
      <Stack px={"sm"}>
        <ComponentGlobal_BoxInformation informasi="Pengunggahan foto ke aplikasi bersifat opsional dan tidak diwajibkan, Anda dapat menyimpan berita tanpa mengunggah foto." />

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

          <Center>
            <ComponentGlobal_ButtonUploadFileImage
              onSetFile={setFile}
              onSetImage={setImg}
            />
          </Center>
        </Stack>

        <TextInput
          withAsterisk
          placeholder="Masukan judul berita"
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Judul berita"
          onChange={(val) => {
            setData({ data: { ...data.data, title: val.target.value } });
          }}
        />

        <Stack spacing={5}>
          <Textarea
            withAsterisk
            placeholder="Masukan deskripsi berita"
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Deskripsi"
            autosize
            maxLength={500}
            minRows={2}
            maxRows={6}
            onChange={(val) => {
              setData({
                data: { ...data.data, deskripsi: val.target.value },
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={data.data.deskripsi.length}
            maxInput={500}
          />
        </Stack>

        <Button
          disabled={data.data.title === "" || data.data.deskripsi === ""}
          style={{
            transition: "all 0.5s",
          }}
          loaderPosition="center"
          loading={isLoading}
          my={"md"}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          onClick={() => {
            onCreate();
          }}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
