"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { Warna } from "@/lib/warna";
import {
  AspectRatio,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Model_Berita_Investasi } from "../_lib/interface";
import funEditBeritaInvestasi from "../fun/fun_edit_berita";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";

export default function EditBeritaInvestasi({
  dataBerita,
}: {
  dataBerita: Model_Berita_Investasi;
}) {
  const router = useRouter();
  const [edit, setEdit] = useState(dataBerita);
  const [img, setImg] = useState<any | null>();
  const [fl, setFl] = useState<File | null>(null);

  async function onUpdate() {
    const body = edit;
    if (_.values(body).includes("")) return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");

    const fd = new FormData();
    fd.append("file", fl as any);

    await funEditBeritaInvestasi(fd, body).then(async (res) => {
      if (res.status === 200) {
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
      <Stack>
        <AspectRatio ratio={16 / 9}>
          {img ? (
            <Image alt="" src={img} />
          ) : (
            <Image
              alt=""
              src={RouterInvestasi_OLD.api_gambar + `${edit.imagesId}`}
            />
          )}
        </AspectRatio>
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
                {...props}
                radius={50}
                bg={Warna.hijau_muda}
                color="green"
              >
                <IconCamera />
              </Button>
            )}
          </FileButton>
        </Group>

        <TextInput
          label="Judul berita"
          value={edit.title}
          onChange={(val) => {
            setEdit({
              ...edit,
              title: val.target.value,
            });
          }}
        />
        <Textarea
          label="Deskripsi"
          autosize
          minRows={2}
          maxRows={6}
          value={edit.deskripsi}
          onChange={(val) => {
            setEdit({
              ...edit,
              deskripsi: val.target.value,
            });
          }}
        />
      </Stack>
      <Center mt={100}>
        <Button
          w={300}
          radius={50}
          bg={Warna.hijau_muda}
          color="green"
          onClick={() => {
            onUpdate();
          }}
        >
          Update
        </Button>
      </Center>
    </>
  );
}
