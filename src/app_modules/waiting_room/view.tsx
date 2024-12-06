"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import {
  Button,
  Center,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function WaitingRoom_View({
  activationUser,
  userLoginId,
}: {
  activationUser: boolean;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onClickLogout() {
    setLoading(true);
    const res = await fetch(`/api/auth/logout?id=${userLoginId}`, {
      method: "GET",
    });

    const result = await res.json();
    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(result.message);
      router.push("/", { scroll: false });
    }
  }

  useShallowEffect(() => {
    if (activationUser == true) {
      return redirect("/");
    }
  }, [activationUser]);

  const listhHuruf = [
    {
      huruf: "H",
    },
    {
      huruf: "I",
    },
    {
      huruf: "P",
    },
    {
      huruf: "M",
    },
    {
      huruf: "I",
    },
  ];
  const customLOader = (
    <Center>
      <Group>
        {listhHuruf.map((e, i) => (
          <Center key={i} h={"100%"}>
            <Skeleton height={50} circle radius={"100%"} />
            <Text sx={{ position: "absolute" }} c={"gray.5"} fw={"bold"}>
              {e.huruf}
            </Text>
          </Center>
        ))}
      </Group>
    </Center>
  );

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Center h={"100vh"}>
          <Stack align="center" spacing={50}>
            {/* {customLOader} */}

            <Stack align="center" spacing={5}>
              <Title order={3} c={"white"}>
                Anda telah berhasil mendaftar,
              </Title>
              <Title order={3} c={"white"}>
                Mohon menunggu konfirmansi Admin !
              </Title>
            </Stack>

            <Button
              color="red"
              loaderPosition="center"
              loading={loading}
              radius={"xl"}
              onClick={() => onClickLogout()}
            >
              Keluar
            </Button>
          </Stack>
        </Center>
      </UIGlobal_LayoutDefault>
    </>
  );
}
