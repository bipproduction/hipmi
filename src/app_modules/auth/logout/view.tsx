"use client";

import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { Warna } from "@/lib/warna";
import { ActionIcon, Button, Stack, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetchLogout } from "../_lib/api_fetch_auth";

export default function Component_ButtonLogout({ userId }: { userId: string }) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onClickLogout() {
    try {
      setLoading(true);
      const response = await apiFetchLogout({ id: userId });

      if (response && response.success) {
        ComponentGlobal_NotifikasiBerhasil(response.message);
        router.replace("/", { scroll: false });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <UIGlobal_Modal
        title={"Anda yakin ingin keluar ?"}
        buttonKiri={
          <Button
            onClick={() => {
              setLoading(false);
              setOpened(false);
            }}
            radius={50}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={loading ? true : false}
            radius={50}
            bg={Warna.merah}
            color="red"
            onClick={() => {
              onClickLogout();
            }}
          >
            Keluar
          </Button>
        }
        opened={opened}
        close={() => setOpened(false)}
      />

      <Stack align="center" spacing={"xs"}>
        <ActionIcon
          variant="transparent"
          c="white"
          onClick={() => {
            setOpened(true);
          }}
        >
          <IconLogout color={MainColor.red} />
        </ActionIcon>
        <Text fw={"bold"} align="center" color={MainColor.red}>
          Keluar
        </Text>
      </Stack>
    </>
  );
}
