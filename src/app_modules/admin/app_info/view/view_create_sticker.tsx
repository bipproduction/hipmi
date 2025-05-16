"use client";

import {
  AspectRatio,
  Box,
  Button,
  Center,
  Chip,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { DIRECTORY_ID, pathAssetImage } from "@/lib";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import { IconCheck, IconPhoto, IconUpload } from "@tabler/icons-react";
import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { baseStylesTextInput } from "@/app_modules/_global/lib/base_style_text_input";
import { useState } from "react";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import { useRouter } from "next/navigation";
import { apiGetMasterEmotions } from "@/app_modules/_global/lib/api_fetch_master";
import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import { apiAdminCreateSticker } from "../lib/api_fetch_stiker";

interface IData {
  name: string;
  //   jenis_kelamin: "Laki-laki" | "Perempuan" | null;
}
export default function AdminAppInformation_ViewCreateSticker() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);
  const [valueEmotion, setValueEmotion] = useState(["senang"]);
  const [data, setData] = useState<IData>({
    name: "",
    // jenis_kelamin: null,
  });

  const [listEmotion, setListEmotion] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    onLoadMasterEmotions();
  }, []);

  async function onLoadMasterEmotions() {
    try {
      const response = await apiGetMasterEmotions();

      if (response.success) {
        setListEmotion(response.data);
      }
    } catch (error) {
      console.error("Error on load master emotions:", error);
    }
  }

  const validateData = () => {
    if (!file) {
      ComponentAdminGlobal_NotifikasiPeringatan("File tidak ada");
      return false;
    }

    if (valueEmotion.length === 0) {
      ComponentAdminGlobal_NotifikasiPeringatan("Pilih emosi");
      return false;
    }

    return true;
  };

  async function onUploadFile() {
    try {
      const response = await funGlobal_UploadToStorage({
        file: file as File,
        dirId: DIRECTORY_ID.sticker,
      });

      if (!response.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      return response.data.id;
    } catch (error) {
      console.error("Error on upload file", error);
    }
  }

  async function handleCreateSticker({ fileId }: { fileId: string }) {
    try {
      const response = await apiAdminCreateSticker({
        data: {
          emotions: valueEmotion,
          fileId: fileId,
        },
      });

      if (response.success) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
        router.back();
      } else {
        setLoading(false);
        throw new Error("Failed to create sticker");
      }
    } catch (error) {
      setLoading(false);
      ComponentGlobal_NotifikasiGagal("Gagal disimpan");
      console.error("Error create sticker", error);
    }
  }

  async function onSubmit() {
    if (!validateData()) return;

    try {
      setLoading(true);
      const uploadFile = await onUploadFile();

      if (!uploadFile) {
        setLoading(false);
        return;
      }

      await handleCreateSticker({ fileId: uploadFile });
    } catch (error) {
      console.error("Error on create sticker", error);
    }
  }

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Tambah Stiker" />
        <Admin_ComponentBackButton />

        <Admin_V3_ComponentBreakpoint lg={2} md={2} sm={1}>
          {!listEmotion.length ? (
            <CustomSkeleton height={265} />
          ) : (
            <Admin_ComponentBoxStyle>
              <Stack>
                <Stack spacing={"xs"}>
                  <ComponentGlobal_BoxUploadImage>
                    {img ? (
                      <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                        <Image
                          style={{
                            maxHeight: 250,
                            margin: "auto",
                            padding: "5px",
                          }}
                          alt="Foto"
                          height={250}
                          src={img}
                        />
                      </AspectRatio>
                    ) : (
                      <Stack
                        spacing={5}
                        justify="center"
                        align="center"
                        h={"100%"}
                      >
                        <IconPhoto size={100} />
                      </Stack>
                    )}
                  </ComponentGlobal_BoxUploadImage>

                  <Center>
                    <ComponentGlobal_ButtonUploadFileImage
                      accept="image/webp, image/jpeg, image/png"
                      onSetFile={setFile}
                      onSetImage={setImg}
                    />
                  </Center>
                </Stack>

                <Stack>
                  {/* <TextInput
                    required
                    placeholder="Masukkan nama stiker"
                    label="Nama stiker"
                    styles={{
                      ...baseStylesTextInput,
                      required: { color: MainColor.red },
                    }}
                    onChange={(val) => {
                      setData({
                        ...data,
                        name: val.target.value,
                      });
                    }}
                  /> */}

                  {/* <Select
                  required
                  placeholder="Pilih jenis kelamin"
                  label="Jenis kelamin"
                  styles={{
                    ...baseStylesTextInput,
                    required: { color: MainColor.red },
                  }}
                  data={[
                    { value: "Laki-laki", label: "Laki-laki" },
                    { value: "Perempuan", label: "Perempuan" },
                  ]}
                  onChange={(val: any) => {
                    setData({
                      ...data,
                      jenis_kelamin: val,
                    });
                  }}
                /> */}

                  <Stack>
                    <Component_V3_Label_TextInput text="Pilih emosi stiker" />
                    <Group style={{ display: "flex", flexWrap: "wrap" }}>
                      <Chip.Group
                        multiple
                        value={valueEmotion}
                        onChange={setValueEmotion}
                      >
                        {listEmotion.map((e, i) => {
                          return (
                            <Chip key={i} value={e.value}>
                              {e.label}
                            </Chip>
                          );
                        })}
                      </Chip.Group>
                    </Group>
                  </Stack>

                  <Box
                    mt={"xl"}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      color="green"
                      bg={MainColor.green}
                      loading={loading}
                      loaderPosition="center"
                      radius="xl"
                      leftIcon={<IconCheck size={20} />}
                      onClick={() => onSubmit()}
                    >
                      Simpan
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Admin_ComponentBoxStyle>
          )}
        </Admin_V3_ComponentBreakpoint>
      </Stack>
    </>
  );
}
