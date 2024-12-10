"use client";

import {
  ActionIcon,
  Avatar,
  Badge,
  Center,
  Grid,
  Group,
  Loader,
  Skeleton,
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
import { useShallowEffect } from "@mantine/hooks";
import { API_RouteEvent } from "@/app/lib/api_user_router/route_api_event";
import Event_ComponentSkeletonListPeserta from "../skeleton/comp_skeleton_list_peserta";
import { ScrollOnly } from "next-scroll-loader";
import { event_newGetListPesertaById } from "../../fun";

export default function ComponentEvent_ListPeserta({
  total,
  eventId,
  isNewPeserta,
}: {
  total: number;
  eventId: string;
  isNewPeserta?: boolean | null;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT_PESERTA[] | null>(null);
  const [activePage, setActivePage] = useState<number>(1);

  useShallowEffect(() => {
    onLoadPeserta();
  }, []);

  useShallowEffect(() => {
    if (isNewPeserta !== null && isNewPeserta === true) {
      onLoadPeserta();
    }
  }, [isNewPeserta]);

  async function onLoadPeserta() {
    const res = await fetch(
      API_RouteEvent.list_peserta({ eventId: eventId, page: 1 })
    );
    const data = await res.json();
    setData(data);
  }

  return (
    <>
      {data === null ? (
        <Event_ComponentSkeletonListPeserta />
      ) : (
        <ComponentGlobal_CardStyles>
          <Stack spacing={"md"} px={"sm"}>
            <Center>
              <Title order={5}>Daftar Peserta ({total})</Title>
            </Center>

            {_.isEmpty(data) ? (
              <Center>
                <Text fz={"xs"} fw={"bold"}>
                  - Tidak ada peserta -
                </Text>
              </Center>
            ) : (
              // <Stack>
              //   {data.map((e, i) => (
              //     <Stack key={i} spacing={"sm"}>
              //       <ComponentEvent_AvatarAndUsername
              //         profile={e?.User?.Profile as any}
              //         sizeAvatar={30}
              //         fontSize={"sm"}
              //         tanggalMulai={e?.Event?.tanggal}
              //         tanggalSelesai={e?.Event?.tanggalSelesai}
              //         isPresent={e?.isPresent}
              //       />

              //       {/* <Divider /> */}
              //     </Stack>
              //   ))}
              // </Stack>
              <ScrollOnly
                height="90vh"
                renderLoading={() => (
                  <Center mt={"lg"}>
                    <Loader color={"yellow"} />
                  </Center>
                )}
                data={data}
                setData={setData as any}
                moreData={async () => {
                  const loadData = await event_newGetListPesertaById({
                    eventId: eventId as string,
                    page: activePage + 1,
                  });

                  setActivePage((val) => val + 1);

                  return loadData;
                }}
              >
                {(item) => (
                  <ComponentEvent_AvatarAndUsername
                    profile={item?.User?.Profile as any}
                    sizeAvatar={30}
                    fontSize={"sm"}
                    tanggalMulai={item?.Event?.tanggal}
                    tanggalSelesai={item?.Event?.tanggalSelesai}
                    isPresent={item?.isPresent}
                  />
                )}
              </ScrollOnly>
            )}
          </Stack>
        </ComponentGlobal_CardStyles>
      )}
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

  const tglMulai = moment(tanggalMulai).diff(moment(), "minutes") < 0;

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

        {tglMulai && (
          <Grid.Col span={4} style={{ minHeight: 50 }}>
            <Group position="right">
              <Stack justify="center" h={30}>
                <Text fw={"bold"} fz={fontSize ? fontSize : "sm"}>
                  {isPresent ? (
                    <Badge color="green">Hadir</Badge>
                  ) : (
                    <Badge>-</Badge>
                  )}
                </Text>
              </Stack>
            </Group>
          </Grid.Col>
        )}
      </Grid>
    </>
  );
}
