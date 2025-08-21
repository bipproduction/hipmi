"use client";

import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import {
  UIGlobal_DrawerCustom,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
  UIGlobal_Modal,
} from "@/app_modules/_global/ui";
import { ActionIcon, Button, Center, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { investasi_funDeleteBerita } from "../../_fun";
import { Investasi_ViewDetailBerita } from "../../_view";
import { DIRECTORY_ID } from "@/lib";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetBeritaInvestasiById } from "../../_lib/api_interface";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewHeader,
  UI_NewChildren,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";

export function Investasi_UiDetailBerita() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    handleGetUserId();
    onLoadData();
  }, []);

  async function handleGetUserId() {
    try {
      const respone = await apiNewGetUserIdByToken();

      if (respone) {
        setUserLoginId(respone.userId);
      }
    } catch (error) {
      console.error("Error get data detail", error);
    }
  }

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetBeritaInvestasiById({
        id: id,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get detail berita", error);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      const del = await investasi_funDeleteBerita({
        beritaId: id,
      });

      if (del.status === 200) {
        if (data.imageId != null) {
          const deleteImage = await funGlobal_DeleteFileById({
            fileId: data.imageId,
            dirId: DIRECTORY_ID.investasi_berita,
          });

          if (!deleteImage.success) {
            setLoading(false);
            ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
          }
        }

        router.back();
        ComponentGlobal_NotifikasiBerhasil(del.message);
        setOpenModal(false);
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(del.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error delete berita", error);
    }
  }

  return (
    <>

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail Berita"
            customButtonRight={
              data && userLoginId === data.investasi.authorId ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color="white" />
                </ActionIcon>
              ) : (
                ""
              )
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewDetailBerita />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>

      <UIGlobal_DrawerCustom
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={
          <Center>
            <Stack
              align="center"
              spacing={"xs"}
              onClick={() => {
                setOpenDrawer(false);
                setOpenModal(true);
              }}
            >
              <ActionIcon variant="transparent">
                <IconTrash color="red" />
              </ActionIcon>
              <Text c={"red"}>Hapus berita</Text>
            </Stack>
          </Center>
        }
      />

      <UIGlobal_Modal
        opened={openModal}
        close={() => setOpenModal(false)}
        title={"Anda yakin ingin menghapus berita ini ?"}
        buttonKiri={
          <Button radius="xl" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoading}
            radius="xl"
            color="red"
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        }
      />
    </>
  );
}
