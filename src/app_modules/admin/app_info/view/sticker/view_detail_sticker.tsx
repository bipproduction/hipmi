"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxUploadImage,
  ComponentGlobal_ButtonUploadFileImage,
} from "@/app_modules/_global/component";
import Component_V3_Label_TextInput from "@/app_modules/_global/component/new/comp_V3_label_text_input";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { apiGetMasterEmotions } from "@/app_modules/_global/lib/api_fetch_master";
import { ISticker } from "@/app_modules/_global/lib/interface/stiker";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import { Admin_ComponentModal } from "@/app_modules/admin/_admin_global/_component/comp_admin_modal";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import Admin_ComponentBackButton from "@/app_modules/admin/_admin_global/back_button";
import { Admin_V3_ComponentBreakpoint } from "@/app_modules/admin/_components_v3/comp_simple_grid_breakpoint";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { APIs, DIRECTORY_ID, pathAssetImage } from "@/lib";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Chip,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  apiAdminDeleteSticker,
  apiAdminGetStickerById,
  apiAdminUpdateSticker,
} from "../../lib/api_fetch_stiker";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { masterJenisKelamin } from "@/app_modules/_global/lib/master_jenis_kelamin";

export default function AdminAppInformation_ViewStickerDetail() {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<any | null>(null);
  const [listEmotion, setListEmotion] = useState<any[]>([]);
  const [valueEmotion, setValueEmotion] = useState<any[]>([]);
  const [data, setData] = useState<ISticker | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useShallowEffect(() => {
    onLoadData();
    onLoadMasterEmotions();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiAdminGetStickerById({ id: param.id });
      if (response.success) {
        setData(response.data);
        setValueEmotion(response.data.MasterEmotions.map((e: any) => e.value));
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

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

  async function onUploadFile() {
    try {
      const response = await funGlobal_UploadToStorage({
        file: file as File,
        dirId: DIRECTORY_ID.sticker,
      });

      if (!response.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      } else {
        const deleteFile = await funGlobal_DeleteFileById({
          fileId: data?.fileId as string,
        });

        if (!deleteFile.success) {
          ComponentGlobal_NotifikasiPeringatan("Gagal delete gambar");
          return;
        }

        return response.data.id;
      }
    } catch (error) {
      console.error("Error on upload file", error);
    }
  }

  async function handleUpdateSticker({ fileId }: { fileId?: string }) {
    try {
      const response = await apiAdminUpdateSticker({
        data: {
          emotions: valueEmotion,
          fileId: fileId || "",
          id: param.id,
          jenisKelamin: data?.jenisKelamin,
        },
      });

      if (response.success) {
        ComponentAdminGlobal_NotifikasiBerhasil("Berhasil disimpan");
        router.back();
      } else {
        setLoading(false);
        throw new Error("Failed to create sticker");
      }
    } catch (error) {
      setLoading(false);
      ComponentAdminGlobal_NotifikasiGagal("Gagal disimpan");
      console.error("Error create sticker", error);
    }
  }

  async function onSubmit() {
    try {
      setLoading(true);

      if (file) {
        const uploadFile = await onUploadFile();

        if (!uploadFile) {
          setLoading(false);
          return;
        }

        await handleUpdateSticker({ fileId: uploadFile });
      } else {
        await handleUpdateSticker({});
      }
    } catch (error) {
      console.error("Error on create sticker", error);
    }
  }

  async function onDelete() {
    try {
      setLoadingDelete(true);
      const response = await apiAdminDeleteSticker({ id: param.id });

      if (response.success) {
        const deleteFile = await funGlobal_DeleteFileById({
          fileId: data?.fileId as string,
        });

        setLoadingDelete(false);
        ComponentAdminGlobal_NotifikasiBerhasil("Berhasil dihapus");
        router.back();
      } else {
        setLoadingDelete(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal dihapus");
      }
    } catch (error) {
      setLoadingDelete(false);
      ComponentAdminGlobal_NotifikasiGagal("Proses hapus error");
      console.error("Error delete sticker", error);
    }
  }

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Detail Stiker" />
        <Admin_ComponentBackButton />
        {/* <pre style={{ color: "white" }}>
          {JSON.stringify(valueEmotion, null, 2)}
        </pre> */}

        <Admin_V3_ComponentBreakpoint lg={2} md={2} sm={1}>
          {!listEmotion.length || !data ? (
            <CustomSkeleton height={400} />
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
                      <AspectRatio ratio={1 / 1} mah={265} mx={"auto"}>
                        <Image
                          style={{
                            maxHeight: 250,
                            margin: "auto",
                            padding: "5px",
                          }}
                          alt="Foto"
                          height={250}
                          src={
                            data.fileId
                              ? APIs.GET({ fileId: data.fileId })
                              : pathAssetImage.no_image
                          }
                        />
                      </AspectRatio>
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
                  <Select
                    required
                    placeholder="Pilih jenis kelamin"
                    value={data.jenisKelamin || ""}
                    onChange={(val) =>
                      setData({
                        ...data,
                        jenisKelamin: val,
                      })
                    }
                    data={masterJenisKelamin}
                  />

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
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <Button
                      color="red"
                      bg={MainColor.red}
                      loaderPosition="center"
                      radius="xl"
                      leftIcon={<IconTrash size={20} />}
                      onClick={() => setOpenModalDelete(true)}
                    >
                      Hapus
                    </Button>

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

        <Admin_ComponentModal
          opened={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
          withCloseButton={false}
          closeOnClickOutside={false}
          size="md"
        >
          <Stack>
            <Title order={5} c={AdminColor.white}>
              Apakah anda yakin ingin menghapus stiker ini?
            </Title>
            <Group position="center">
              <Button radius="xl" onClick={() => setOpenModalDelete(false)}>
                Batal
              </Button>
              <Button
                loading={loadingDelete}
                loaderPosition="center"
                radius="xl"
                color="red"
                bg={MainColor.red}
                onClick={() => onDelete()}
              >
                Hapus
              </Button>
            </Group>
          </Stack>
        </Admin_ComponentModal>
      </Stack>
    </>
  );
}
