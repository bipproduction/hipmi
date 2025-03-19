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
import { ActionIcon, Center, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Donasi_funDeleteKabar } from "../../fun/delete/fun_delete.kabar";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren } from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutUpdateKabarDonasi({
  children,
  kabarId,
}: {
  children: React.ReactNode;
  kabarId: string;
}) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  async function onDelete() {
    const res = await Donasi_funDeleteKabar(kabarId);
    if (res.status === 200) {
      const deleteImage = await funGlobal_DeleteFileById({
        fileId: res.imageId as any,
      });

      if (!deleteImage.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar ");
      }

      ComponentGlobal_NotifikasiBerhasil(res.message);
      router.back();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
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
        }
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

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
                  router.push(RouterDonasi.edit_kabar({ id: kabarId }), {
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
                  <IconTrash color="red" />
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
