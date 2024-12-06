"use client";

import { Warna } from "@/app/lib/warna";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_Modal from "@/app_modules/_global/ui/ui_modal";
import { ActionIcon, Button, Stack, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth_Logout } from "../fun/fun_logout";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";

export default function Component_ButtonLogout({userId}: {userId: string}) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onClickLogout() {
    setLoading(true);
    const res = await fetch(`/api/auth/logout?id=${userId}`, {
      method: "GET",
    });

    const result = await res.json();
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(result.message);
      router.push("/", { scroll: false });
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
          <IconLogout color="red" />
        </ActionIcon>
        <Text fw={"bold"} align="center" color="red">
          Keluar
        </Text>
      </Stack>
    </>
  );
}
