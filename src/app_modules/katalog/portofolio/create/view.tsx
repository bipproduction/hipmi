"use client";

import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import {
  BIDANG_BISNIS_OLD,
  MODEL_PORTOFOLIO_OLD,
} from "@/app_modules/model_global/portofolio";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FileButton,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreatePortofolio from "../fun/fun_create_portofolio";
import { Portofolio_ComponentButtonSelanjutnya } from "../component";
import { ComponentGlobal_BoxUploadImage } from "@/app_modules/_global/component";

export default function CreatePortofolio({
  bidangBisnis,
  profileId,
}: {
  bidangBisnis: BIDANG_BISNIS_OLD;
  profileId: any;
}) {
  const [dataPortofolio, setDataPortofolio] = useState({
    namaBisnis: "",
    masterBidangBisnisId: "",
    alamatKantor: "",
    tlpn: "",
    deskripsi: "",
  });

  const [dataMedsos, setDataMedsos] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [file, setFile] = useState<File | any>(null);
  const [img, setImg] = useState<any | null>(null);
  const [isFile, setIsFile] = useState(false);

  return (
    <>
      {/* {JSON.stringify(profileId)} */}

      <Stack px={"sm"} mb={"lg"} spacing={50}>
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Lengkapi Data Bisnis" />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Nama Bisnis"
            placeholder="Nama bisnis"
            maxLength={100}
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                namaBisnis: _.startCase(val.target.value),
              });
            }}
          />
          <Select
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Bidang Bisnis"
            placeholder="Pilih salah satu bidang bisnis"
            data={_.map(bidangBisnis as any).map((e: any) => ({
              value: e.id,
              label: e.name,
            }))}
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                masterBidangBisnisId: val as any,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Alamat Bisnis"
            placeholder="Alamat bisnis"
            maxLength={100}
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                alamatKantor: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            withAsterisk
            label="Nomor Telepon "
            placeholder="Nomor telepon "
            type="number"
            onChange={(val) => {
              setDataPortofolio({
                ...dataPortofolio,
                tlpn: val.target.value,
              });
            }}
          />
          <Stack spacing={5}>
            <Textarea
              styles={{
                label: {
                  color: "white",
                },
              }}
              maxLength={300}
              autosize
              minRows={2}
              maxRows={5}
              withAsterisk
              label="Deskripsi"
              placeholder="Deskripsi singkat mengenai usaha"
              onChange={(val) => {
                setDataPortofolio({
                  ...dataPortofolio,
                  deskripsi: val.target.value,
                });
              }}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={dataPortofolio.deskripsi.length}
            />
          </Stack>
        </Stack>

        <Stack>
          <ComponentGlobal_BoxInformation informasi="Upload Logo Bisnis Anda!" />
          {/* <AspectRatio ratio={16 / 9}>
            <Paper radius={"md"} withBorder>
              <Image alt="Foto" src={img ? img : "/aset/no-img.png"} />
            </Paper>
          </AspectRatio>

          

          {isFile ? <ComponentGlobal_ErrorInput text="Upload gambar" /> : ""} */}

          <ComponentGlobal_BoxUploadImage>
            {img ? (
              <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                <Image
                  style={{ maxHeight: 250, margin: "auto", padding: "5px" }}
                  alt="Foto"
                  height={250}
                  src={img}
                />
              </AspectRatio>
            ) : (
              <Stack spacing={5} justify="center" align="center" h={"100%"}>
                <Title order={3}>Upload Logo Bisnis</Title>
                <Text fs={"italic"} fz={10} align="center">
                  Masukan logo bisnis anda untuk ditampilkan dalam portofolio
                </Text>
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
                  if (files.size > 2000000) {
                    ComponentGlobal_NotifikasiPeringatan(
                      "Maaf, Ukuran file terlalu besar, maximum 2mb",
                      3000
                    );
                  } else {
                    setImg(buffer);
                    setFile(files);
                    setIsFile(false);
                  }
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
          <ComponentGlobal_BoxInformation informasi="Isi hanya pada sosial media yang anda miliki" />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Facebook"
            maxLength={100}
            placeholder="Facebook"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                facebook: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Instagram"
            maxLength={100}
            placeholder="Instagram"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                instagram: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Tiktok"
            maxLength={100}
            placeholder="Tiktok"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                tiktok: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Twitter"
            maxLength={100}
            placeholder="Twitter"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                twitter: val.target.value,
              });
            }}
          />
          <TextInput
            styles={{
              label: {
                color: "white",
              },
            }}
            label="Youtube"
            maxLength={100}
            placeholder="Youtube"
            onChange={(val) => {
              setDataMedsos({
                ...dataMedsos,
                youtube: val.target.value,
              });
            }}
          />
        </Stack>

        <Portofolio_ComponentButtonSelanjutnya
          dataPortofolio={dataPortofolio as any}
          dataMedsos={dataMedsos}
          file={file}
          profileId={profileId}
          setIsFile={setIsFile}
        />
      </Stack>

      {/* <pre> {JSON.stringify(bidangBisnis, null, 2)}</pre> */}
    </>
  );
}
