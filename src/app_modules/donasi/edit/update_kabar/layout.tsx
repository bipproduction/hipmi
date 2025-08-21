"use client";

import { funGlobal_DeleteFileById } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { UIGlobal_DrawerCustom } from "@/app_modules/_global/ui";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import {
  ActionIcon,
  Center,
  SimpleGrid,
  Stack,
  Text,
  Loader,
} from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Donasi_funDeleteKabar } from "../../fun/delete/fun_delete.kabar";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewHeader,
  UI_NewChildren,
} from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutUpdateKabarDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  async function onDelete() {
    try {
      setLoadingDelete(true);
      const res = await Donasi_funDeleteKabar(id);
      if (res.status === 200) {
        let deleteImage = null;
        if (res.imageId) {
          const deleteImage = await funGlobal_DeleteFileById({
            fileId: res.imageId as any,
          });

          if (!deleteImage.success) {
            console.log("Gagal hapus gambar ");
          }
        }

        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error delete kabar", error);
    } finally {
      setLoadingDelete(false);
    }
  }
  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Update Kabar"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>

      <UIGlobal_DrawerCustom
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={
          <SimpleGrid cols={2}>
            <Center>
              <Stack
                align="center"
                spacing={"xs"}
                onClick={() => {
                  router.push(RouterDonasi.edit_kabar({ id: id }), {
                    scroll: false,
                  });
                }}
              >
                <ActionIcon variant="transparent">
                  <IconEdit color="white" />
                </ActionIcon>
                <Text color="white">Edit kabar</Text>
              </Stack>
            </Center>
            <Center>
              <Stack align="center" spacing={"xs"} onClick={() => onDelete()}>
                <ActionIcon variant="transparent">
                  {loadingDelete ? (
                    <Loader size="sm" color="yellow" />
                  ) : (
                    <IconTrash color="red" />
                  )}
                </ActionIcon>
                <Text color="red">Hapus kabar</Text>
              </Stack>
            </Center>
          </SimpleGrid>
        }
      />
    </>
  );
}
