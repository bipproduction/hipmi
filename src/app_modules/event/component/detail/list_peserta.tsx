"use client";

import {
  ActionIcon,
  Avatar,
  Center,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import _ from "lodash";

import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoaderAvatar,
} from "@/app_modules/_global/component";
import { useRouter } from "next/navigation";
import { MODEL_EVENT_PESERTA } from "../../model/interface";
import { Prisma } from "@prisma/client";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { funGlobal_CheckProfile } from "@/app_modules/_global/fun/get";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { useState } from "react";
import moment from "moment";

export default function ComponentEvent_ListPeserta({
  listPeserta,
  total,
}: {
  listPeserta: MODEL_EVENT_PESERTA[];
  total: number;
}) {
  const router = useRouter();
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"md"} px={"sm"}>
          <Center>
            <Title order={5}>Daftar Peserta ({total})</Title>
          </Center>

          {_.isEmpty(listPeserta) ? (
            <Center>
              <Text fz={"xs"} fw={"bold"}>
                - Tidak ada peserta -
              </Text>
            </Center>
          ) : (
            <Stack>
              {listPeserta.map((e, i) => (
                <Stack key={i} spacing={"sm"}>
                  {/* <ComponentGlobal_AvatarAndUsername
                    profile={e?.User?.Profile as any}
                    sizeAvatar={30}
                    fontSize={"sm"}

                  /> */}
                  <ComponentEvent_AvatarAndUsername
                    profile={e?.User?.Profile as any}
                    sizeAvatar={30}
                    fontSize={"sm"}
                    tanggalMulai={e?.Event?.tanggal}
                    tanggalSelesai={e?.Event?.tanggalSelesai}
                    isPresent={e?.isPresent}
                  />

                  {/* <Divider /> */}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}

type IFontSize = "xs" | "sm" | "md" | "lg" | "xl";

function ComponentEvent_AvatarAndUsername({
  profile,
  component,
  sizeAvatar,
  fontSize,
  tanggalMulai,
  tanggalSelesai,
  isPresent,
}: {
  profile: Prisma.ProfileSelect;
  component?: React.ReactNode;
  sizeAvatar?: number;
  fontSize?: IFontSize | {};
  tanggalMulai?: Date;
  tanggalSelesai?: Date;
  isPresent?: boolean;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  async function onCheckProfile() {
    const res = await funGlobal_CheckProfile({ profileId: profile.id as any });

    if (res !== null) {
      setVisible(true);
      router.push(RouterProfile.katalog({ id: profile.id as any }));
    } else {
      ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
    }
  }

  const tglMulai = moment(tanggalMulai).diff(moment(), "minutes");

  const tglSelesai = moment(tanggalSelesai).diff(moment(), "minutes");

  // console.log("mulai:", tglMulai, "selesai:", tglSelesai);

  return (
    <>
      <Grid align="flex-start" justify="space-around">
        <Grid.Col span={2} style={{ minHeight: 50 }}>
          <ActionIcon
            radius={"xl"}
            variant="transparent"
            onClick={() => onCheckProfile()}
          >
            {visible ? (
              <Avatar radius={"xl"} size={40}>
                <ComponentGlobal_Loader />
              </Avatar>
            ) : (
              <ComponentGlobal_LoaderAvatar
                fileId={profile?.imageId as any}
                sizeAvatar={sizeAvatar}
              />
            )}
          </ActionIcon>
        </Grid.Col>

        <Grid.Col span={"auto"} style={{ minHeight: 50 }}>
          <Stack justify="center" h={30}>
            <Text
              fw={"bold"}
              fz={fontSize ? fontSize : "sm"}
              lineClamp={1}
              onClick={() => onCheckProfile()}
            >
              {profile?.name}
            </Text>
          </Stack>
        </Grid.Col>

        {/* {component && (
          <Grid.Col span={"auto"} style={{ minHeight: 50 }}>
            <Stack justify="center" h={30}>
              {component}
            </Stack>
          </Grid.Col>
        )} */}

        {tglMulai < 0 && (
          <Grid.Col span={3} style={{ minHeight: 50 }}>
            <Group position="right">
              <Stack justify="center" h={30}>
                <Text fw={"bold"} fz={fontSize ? fontSize : "sm"}>
                  {isPresent ? "Hadir" : "-"}
                </Text>
              </Stack>
            </Group>
          </Grid.Col>
        )}
      </Grid>
    </>
  );
}
