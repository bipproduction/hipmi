"use client";

import { Warna } from "@/lib/warna";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreateBeritaInvestasi from "../fun/fun_create_berita";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";

export default function CreateBeritaInvestasi({
  idInves,
}: {
  idInves: string;
}) {
  const router = useRouter();
  const [fl, setFl] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>();

  const [value, setValue] = useState({
    title: "",
    deskripsi: "",
    investasiId: idInves,
  });

  async function onCreate() {
    const body = value;

    if (_.values(body).includes("")) return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");
    if (!fl) return ComponentGlobal_NotifikasiPeringatan("File Kosong");

    const fd = new FormData();
    fd.append("file", fl);

    // await funCreateBeritaInvestasi(fd, body as any).then((res) => {
    //   res.status === 201
    //     ? (ComponentGlobal_NotifikasiBerhasil(res.message), router.back())
    //     : ComponentGlobal_NotifikasiGagal(res.message);
    // });

    // router.back();
    // toast("Berita tersimpan");
  }

  return (
    <>
      <Stack px={"xl"}>
        {img ? (
          <AspectRatio ratio={1 / 1} mah={300}>
            <Paper
              style={{
                border: `2px solid ${AccentColor.softblue}`,
                backgroundColor: AccentColor.blue,
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Image
                alt="Foto"
                src={img ? img : "/aset/no-img.png"}
                maw={200}
              />
            </Paper>
          </AspectRatio>
        ) : (
          <Center>
            <Paper h={300} w={200} withBorder shadow="lg" bg={"gray.1"}>
              <Stack justify="center" align="center" h={"100%"}>
                <IconUpload color="gray" />
                <Text fz={10} fs={"italic"} c={"gray"} fw={"bold"}>
                  Upload Gambar
                </Text>
              </Stack>
            </Paper>
          </Center>
        )}
        <Group position="center" mt={"md"}>
          <FileButton
            onChange={async (files: any) => {
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await files.arrayBuffer())])
              );
              setImg(buffer);
              setFl(files);
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button
                leftIcon={<IconCamera />}
                {...props}
                radius={50}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
              >
                Upload
              </Button>
            )}
          </FileButton>
        </Group>
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
            setValue({
              ...value,
              title: val.target.value,
            });
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
            maxLength={300}
            minRows={2}
            maxRows={6}
            onChange={(val) => {
              setValue({
                ...value,
                deskripsi: val.target.value,
              });
            }}
          />
          <ComponentGlobal_InputCountDown
            lengthInput={value.deskripsi.length}
            maxInput={300}
          />
        </Stack>

        <Button
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
