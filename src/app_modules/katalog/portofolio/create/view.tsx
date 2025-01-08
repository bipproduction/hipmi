"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_BoxUploadImage } from "@/app_modules/_global/component";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { BIDANG_BISNIS_OLD } from "@/app_modules/model_global/portofolio";
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
  Textarea,
  Title,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { Portofolio_ComponentButtonSelanjutnya } from "../component";
import { MAX_SIZE } from "@/app_modules/_global/lib";
import { PemberitahuanMaksimalFile } from "@/app_modules/_global/lib/max_size";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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

  const [img, setImg] = useState<any | null>(null);
  const [imageId, setImageId] = useState("");

  return (
    <>
      {/* {JSON.stringify(profileId)} */}

      <Stack px={"sm"} mb={"lg"} spacing={50}>
        <Stack spacing={"sm"}>
          <ComponentGlobal_BoxInformation informasi="Lengkapi Data Bisnis" />
          <TextInput
            styles={{
              label: {
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
              },
              dropdown: {
                backgroundColor: MainColor.white
              }
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
              },
              required: {
                color: MainColor.red,
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

          <Stack spacing={5}>
            <Text c={MainColor.white} fz={"sm"}>
              Nomor Telepon{" "}
              <Text c={"red"} span inherit>
                *
              </Text>
            </Text>

            <PhoneInput
              placeholder="Nomor telepon"
              countrySelectorStyleProps={{
                buttonStyle: {
                  backgroundColor: MainColor.login,
                }  
              }}
              inputStyle={{ width: "100%", backgroundColor: MainColor.login }}
              defaultCountry="id"
              onChange={(val) => {
                const valPhone = val.substring(1);
                setDataPortofolio({
                  ...dataPortofolio,
                  tlpn: valPhone,
                });
              }}
            />
          </Stack>

          <Stack spacing={5}>
            <Textarea
              styles={{
                label: {
                  color: MainColor.white,
                },
                input: {
                  backgroundColor: MainColor.white,
                },
                required: {
                  color: MainColor.red,
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
          <ComponentGlobal_BoxInformation informasi="Upload Logo Bisnis Anda" />
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
                <Title c={MainColor.white} order={3}>
                  Upload Logo Bisnis
                </Title>
                <Text c={MainColor.white} fs={"italic"} fz={10} align="center">
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

                  if (files.size > MAX_SIZE) {
                    setImg(null);
                    ComponentGlobal_NotifikasiPeringatan(
                      PemberitahuanMaksimalFile
                    );

                    return;
                  }

                  // if (files.size > MAX_SIZE) {
                  //   setImg(null);
                  //   setFile(null);
                  //   ComponentGlobal_NotifikasiPeringatan(
                  //     PemberitahuanMaksimalFile
                  //   );
                  // } else {
                  //   setImg(buffer);
                  //   setFile(files);
                  // }

                  if (imageId != "") {
                    const deletePhoto = await funGlobal_DeleteFileById({
                      fileId: imageId,
                    });

                    if (deletePhoto.success) {
                      setImageId("");

                      const uploadPhoto = await funGlobal_UploadToStorage({
                        file: files,
                        dirId: DIRECTORY_ID.portofolio_logo,
                      });

                      if (uploadPhoto.success) {
                        setImageId(uploadPhoto.data.id);
                        setImg(buffer);
                      } else {
                        ComponentGlobal_NotifikasiPeringatan(
                          "Gagal upload foto"
                        );
                      }
                    }
                  } else {
                    const uploadPhoto = await funGlobal_UploadToStorage({
                      file: files,
                      dirId: DIRECTORY_ID.portofolio_logo,
                    });

                    if (uploadPhoto.success) {
                      setImageId(uploadPhoto.data.id);
                      setImg(buffer);
                    } else {
                      ComponentGlobal_NotifikasiPeringatan("Gagal upload foto");
                    }
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
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
                color: MainColor.white,
              },
              input: {
                backgroundColor: MainColor.white,
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
          profileId={profileId}
          imageId={imageId}
        />
      </Stack>
    </>
  );
}
