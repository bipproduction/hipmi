"use client";

import { API_RouteEvent } from "@/app/lib/api_user_router/route_api_event";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import {
  UIGlobal_LayoutDefault
} from "@/app_modules/_global/ui";
import {
  Button,
  Center,
  Group,
  Skeleton,
  Stack,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { event_funUpdateKehadiran } from "../fun";
import { Event_funJoinAndConfirmEvent } from "../fun/create/fun_join_and_confirm";
import { gs_event_hotMenu } from "../global_state";
import { MODEL_EVENT } from "../model/interface";

export default function Ui_Konfirmasi({
  userLoginId,
  eventId,
}: {
  userLoginId: string;
  eventId: string;
}) {
  //   console.log(dataEvent);

  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT | null>(null);
  const [isJoin, setIsJoin] = useState<boolean | null>(null);
  const [isPresent, setIsPresent] = useState<boolean | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const data = await fetch(
      API_RouteEvent.get_one_by_id({ eventId: eventId })
    );
    const res = await data.json();
    setData(res.data);
  }

  //  CEK PESERTA
  useShallowEffect(() => {
    onCheckPeserta();
  }, []);

  async function onCheckPeserta() {
    const res = await fetch(
      API_RouteEvent.check_peserta({ eventId: eventId, userId: userLoginId })
    );
    const data = await res.json();
    setIsJoin(data);
  }

  // CEK KEHADIRAN
  useShallowEffect(() => {
    onLoadKehadiran();
  }, []);

  async function onLoadKehadiran() {
    const res = await fetch(
      API_RouteEvent.check_kehadiran({ eventId: eventId, userId: userLoginId })
    );
    const data = await res.json();
    setIsPresent(data);
  }

  if (data == null && isPresent == null) {
    return <SkeletonIsDataNull />;
  }

  if (data == null) {
    return (
      <>
        <DataNotFound />
      </>
    );
  }

  if (moment(data?.tanggalSelesai).diff(moment(), "minute") < 0) {
    return (
      <>
        <EventAlreadyDone title={data?.title} eventId={eventId} />
      </>
    );
  }

  if (isJoin == false) {
    return (
      <>
        <UserNotJoin
          title={data?.title}
          eventId={eventId}
          userLoginId={userLoginId}
        />
      </>
    );
  }

  if (isPresent && data) {
    return <UserAlreadyConfirm title={data.title} />;
  }

  if (isPresent == false && data) {
    return (
      <UserNotConfirm
        title={data.title}
        eventId={eventId}
        userLoginId={userLoginId}
      />
    );
  }
  // const tgl = moment(data?.tanggal).diff(moment(), "minute") < 0;
  // return (
  //   <>
  //     <UIGlobal_LayoutDefault>
  //       <Stack h={"100vh"} justify="center" c={"white"}>
  //         {JSON.stringify(tgl)}
  //       </Stack>
  //     </UIGlobal_LayoutDefault>
  //   </>
  // );
}

function DataNotFound() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} justify="center">
          <ComponentGlobal_CardStyles>
            <Stack>
              <Text fw={"bold"} align="center">
                Data Event Tidak Ditemukan
              </Text>

              <Button
                loading={isLoading}
                loaderPosition="center"
                radius={"xl"}
                color="green"
                c={"black"}
                onClick={() => {
                  setHotMenu(0);
                  setLoading(true);
                  router.push(RouterEvent.beranda, { scroll: false });
                }}
              >
                Kembali Ke Beranda
              </Button>
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}

function SkeletonIsDataNull() {
  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} justify="center">
          <ComponentGlobal_CardStyles>
            <Stack>
              <Skeleton height={20} width={"100%"} radius={"xl"} />{" "}
              <Skeleton height={20} width={"100%"} radius={"xl"} />{" "}
              <Skeleton height={20} width={"100%"} radius={"xl"} />
              <Center>
                <Skeleton height={40} width={"40%"} radius={"sm"} />
              </Center>
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}

function UserNotJoin({
  title,
  eventId,
  userLoginId,
}: {
  title: string;
  eventId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  async function onJoinAndKonfirmasi() {
    setLoading(true);

    const body = {
      eventId: eventId,
      userId: userLoginId,
    };

    const res = await Event_funJoinAndConfirmEvent(body as any);

    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
      router.push(RouterEvent.detail_main + eventId);
    } else {
      setLoading(false);
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }
  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} justify="center">
          <ComponentGlobal_CardStyles>
            <Stack align="center" justify="center">
              <Text align="center">
                Halo, Bapak/Ibu. Kami mencatat bahwa Anda belum melakukan
                registrasi melalui aplikasi untuk mengikuti acara{" "}
                <Text inherit span fw={"bold"}>
                  {title}.
                </Text>{" "}
                Mohon segera lakukan registrasi melalui Event App agar dapat
                mengikuti acara ini. Jika membutuhkan bantuan, jangan ragu untuk
                menghubungi tim kami. Terima kasih Terima kasih atas kehadiran
                Anda di acara pada hari ini. Mohon untuk mengonfirmasi kehadiran
                Anda dengan menekan tombol {"Join & Konfirmasi"}
                atau fitur konfirmasi yang tersedia di bawah. Terima kasih dan
                selamat menikmati acara.
              </Text>

              <Button
                loading={isLoading}
                loaderPosition="center"
                radius={"xs"}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
                onClick={() => {
                  onJoinAndKonfirmasi();
                }}
              >
                Join & Konfirmasi
              </Button>
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}

function EventAlreadyDone({
  title,
  eventId,
}: {
  title: string;
  eventId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDetail, setLoadingDetail] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} justify="center">
          <ComponentGlobal_CardStyles>
            <Stack align="center" justify="center">
              <Text align="center">
                Kami mohon maaf, Bapak/Ibu, acara{" "}
                <Text inherit span fw={"bold"}>
                  {title}
                </Text>{" "}
                telah selesai, sehingga konfirmasi kehadiran sudah tidak dapat
                dilakukan. Terima kasih atas perhatian dan minat Anda. Kami
                berharap dapat bertemu di acara kami berikutnya. Terima kasih,
                Bapak/Ibu, kehadiran Anda di acara.
              </Text>
            </Stack>
            <Group grow mt={"lg"}>
              <Button
                loading={isLoading}
                loaderPosition="center"
                radius={"xl"}
                color="green"
                c={"black"}
                onClick={() => {
                  setHotMenu(0);
                  setLoading(true);
                  router.push(RouterEvent.beranda, { scroll: false });
                }}
              >
                Beranda
              </Button>

              <Button
                loading={isLoadingDetail}
                loaderPosition="center"
                radius={"xl"}
                c={"black"}
                onClick={() => {
                  setHotMenu(3);
                  setLoadingDetail(true);
                  router.push(RouterEvent.detail_riwayat + eventId, {
                    scroll: false,
                  });
                }}
              >
                Riwayat Event
              </Button>
            </Group>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}

function UserNotConfirm({
  title,
  eventId,
  userLoginId,
}: {
  title: string;
  eventId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  async function onUpdateKonfirmasi() {
    setLoading(true);
    const res = await event_funUpdateKehadiran({
      eventId: eventId,
      userId: userLoginId,
    });

    if (res.status === 200) {
      ComponentGlobal_NotifikasiBerhasil(res.message, 2000);
      router.push(RouterEvent.detail_main + eventId);
    } else {
      setLoading(false);
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }
  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} justify="center">
          <ComponentGlobal_CardStyles>
            <Stack align="center" justify="center">
              <Text align="center">
                Terima kasih atas kehadiran Anda di acara{" "}
                <Text inherit span fw={"bold"}>
                  {title}
                </Text>{" "}
                pada hari ini. Mohon untuk mengonfirmasi kehadiran Anda dengan
                menekan tombol {"Hadir"} atau fitur konfirmasi yang tersedia di
                bawah. Terima kasih dan selamat menikmati acara.
              </Text>

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
                HADIR
              </Button>
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}

function UserAlreadyConfirm({ title }: { title: string }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} justify="center">
          <ComponentGlobal_CardStyles>
            <Stack align="center" justify="center">
              <Text align="center">
                Terima kasih, Bapak/Ibu, kehadiran Anda di acara{" "}
                <Text inherit span fw={"bold"}>
                  {title}
                </Text>{" "}
                telah berhasil dikonfirmasi. Kami senang menyambut Anda dan
                semoga acara ini memberikan manfaat yang maksimal. Selamat
                mengikuti kegiatan.
              </Text>

              <Button
                loading={isLoading}
                loaderPosition="center"
                radius={"xl"}
                color="green"
                c={"black"}
                onClick={() => {
                  setHotMenu(0);
                  setLoading(true);
                  router.push(RouterEvent.beranda, { scroll: false });
                }}
              >
                Beranda
              </Button>
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
