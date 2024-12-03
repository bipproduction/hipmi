"use client";

import {
  UIGlobal_LayoutDefault,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Button, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { MODEL_EVENT } from "../model/interface";
import { useShallowEffect } from "@mantine/hooks";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { event_funCheckKehadiran, event_funUpdateKehadiran } from "../fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { useRouter } from "next/navigation";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { useState } from "react";

export default function Ui_Konfirmasi({
  dataEvent,
  userLoginId,
}: {
  dataEvent: MODEL_EVENT;
  userLoginId: string;
}) {
  //   console.log(dataEvent);

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isPresent, setIsPresent] = useState<boolean | null>(null);

  //   useShallowEffect(() => {
  //     onLoadData({
  //       onPublish(val) {
  //         setData(val);
  //       },
  //     });
  //   }, [setData]);

  useShallowEffect(() => {
    onLoadKehadiran({
      onChange(val) {
        setIsPresent(val);
      },
    });
  }, [setIsPresent]);

  async function onLoadKehadiran({
    onChange,
  }: {
    onChange: (val: boolean) => void;
  }) {
    const checkKehadiran = await event_funCheckKehadiran({
      eventId: dataEvent.id,
      userId: userLoginId as string,
    });

    onChange(checkKehadiran);
  }
  async function onUpdateKonfirmasi() {
    setLoading(true);
    const res = await event_funUpdateKehadiran({
      eventId: dataEvent.id,
      userId: userLoginId,
    });

    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
      router.push(RouterEvent.detail_main + dataEvent.id);
    } else {
      setLoading(false);
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  if (isPresent === null) {
    return <></>;
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} align="center" justify="center">
          {isPresent == null ? (
            <Skeleton h={200} w={300} radius={"sm"} />
          ) : isPresent ? (
            <Paper p={"md"} withBorder bg={AccentColor.softblue}>
              <Stack align="center" justify="center">
                <Text fw={"bold"} align="center">
                  Anda telah terkonfirmasi silahkan kembali ke beranda !
                </Text>
                <Title order={3}>{dataEvent.title}</Title>
                <Button
                  loading={isLoading}
                  loaderPosition="center"
                  radius={"md"}
                  color="green"
                  c={"black"}
                  onClick={() => {
                    router.push(RouterEvent.beranda, { scroll: false });
                  }}
                >
                  Beranda
                </Button>
              </Stack>
            </Paper>
          ) : (
            <Paper p={"md"} withBorder bg={AccentColor.softblue}>
              <Stack align="center" justify="center">
                <Text fw={"bold"} align="center">
                  Anda mengkonfirmasi bahwa anda telah datang & ikut menghadir
                  di event
                </Text>
                <Title order={3}>{dataEvent.title}</Title>
                <Button
                  loading={isLoading}
                  loaderPosition="center"
                  radius={"xs"}
                  bg={MainColor.yellow}
                  color="yellow"
                  c={"black"}
                  onClick={() => {
                    onUpdateKonfirmasi();
                  }}
                >
                  YA
                </Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
