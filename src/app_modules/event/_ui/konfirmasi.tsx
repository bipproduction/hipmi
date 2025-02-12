"use client";

import { API_RouteEvent } from "@/lib/api_user_router/route_api_event";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Button, Center, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { event_funUpdateKehadiran } from "../fun";
import { Event_funJoinAndConfirmEvent } from "../fun/create/fun_join_and_confirm";
import { gs_event_hotMenu } from "../global_state";
import { MODEL_EVENT } from "../_lib/interface";
import { Event_funJoinEvent } from "../fun/create/fun_join_event";
import "moment/locale/id";
import { apiGetEventDetailById } from "../_lib/api_event";
import { clientLogger } from "@/util/clientLogger";

export default function Ui_Konfirmasi({
  userLoginId,
}: {
  userLoginId: string;
}) {
  //   console.log(dataEvent);

  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT | null>(null);
  const [isJoin, setIsJoin] = useState<boolean | null>(null);
  const [isPresent, setIsPresent] = useState<boolean | null>(null);

  // Load Data
  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetEventDetailById({
        id: eventId,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail event", error);
    }
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

  // =========== CEK KEHADIRAN ===========//
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
  // =========== CEK KEHADIRAN ===========//

  // Jika data kosong
  if (data == null && isPresent == null) {
    return <SkeletonIsDataNull />;
  }

  // Jika data tidak ada
  if (data == null) {
    return (
      <>
        <DataNotFound />
      </>
    );
  }

  // Jika tanggal acara sudah lewat
  if (moment(data?.tanggalSelesai).diff(moment(), "minute") < 0) {
    return (
      <>
        <EventAlreadyDone title={data?.title} eventId={eventId} />
      </>
    );
  }

  // Jika join true
  if (isJoin == true && moment(data?.tanggal).diff(moment(), "minute") > 0) {
    return (
      <>
        <UserJoinTrue title={data?.title} tanggal={data?.tanggal} />
      </>
    );
  }

  // Jika belum join dan tanggal mulai acara belum lewat
  if (isJoin == false && moment(data?.tanggal).diff(moment(), "minute") > 0) {
    return (
      <>
        <UserAllowToJoin
          title={data?.title}
          tanggal={data?.tanggal}
          lokasi={data.lokasi}
          eventId={eventId}
          userLoginId={userLoginId}
        />
      </>
    );
  }

  // Jika belum join dan tanggal mulai acara sudah lewat
  if (isJoin == false && moment(data?.tanggal).diff(moment(), "minute") < 0) {
    return (
      <>
        <UserNotJoinAndEventReady
          title={data?.title}
          eventId={eventId}
          userLoginId={userLoginId}
        />
      </>
    );
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

  // Jika sudah join, sudah konfirmasi dan tanggal mulai acara sudah lewat
  // if (isPresent && moment(data?.tanggal).diff(moment(), "minute") < 0)
  if (
    isPresent &&
    isJoin &&
    moment(data?.tanggal).diff(moment(), "minute") < 0
  ) {
    return <UserAlreadyConfirm title={data.title} />;
  }
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

function UserJoinTrue({ title, tanggal }: { title: string; tanggal: Date }) {
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
                Terima kasih, Bapak/Ibu, Anda telah berhasil bergabung dalam
                acara{" "}
                <Text inherit span fw={"bold"}>
                  {title}
                </Text>{" "}
                . Mohon ditunggu hingga tanggal{" "}
                <Text inherit span fw={"bold"}>
                  {moment(tanggal).format("DD-MM-YYYY")}
                </Text>{" "}
                untuk melakukan konfirmasi kehadiran melalui aplikasi HIPMI APP.
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

function UserAllowToJoin({
  title,
  tanggal,
  lokasi,
  eventId,
  userLoginId,
}: {
  title: string;
  tanggal: Date;
  lokasi: string;
  eventId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  async function onJoinEvent() {
    setLoading(true);

    const data = {
      userId: userLoginId,
      eventId: eventId,
    };

    const res = await Event_funJoinEvent(data as any);
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
                Halo, Bapak/Ibu. Kami dengan senang hati mengundang Anda untuk
                bergabung dalam acara
                <Text inherit span fw={"bold"}>
                  {title}
                </Text>{" "}
                yang akan diselenggarakan pada{" "}
                <Text inherit span fw={"bold"}>
                  {moment(tanggal).format("LL")}
                </Text>{" "}
                pukul
                <Text inherit span fw={"bold"}>
                  {moment(tanggal).format("LT")}
                </Text>{" "}
                di
                <Text inherit span fw={"bold"}>
                  {lokasi}
                </Text>{" "}
                . Pastikan Anda sudah melakukan registrasi melalui aplikasi
                [Nama Aplikasi] agar dapat berpartisipasi. Kami sangat
                menantikan kehadiran Anda. Sampai jumpa di acara ini.
              </Text>

              <Button
                loading={isLoading}
                loaderPosition="center"
                radius={"xs"}
                bg={MainColor.yellow}
                color="yellow"
                c={"black"}
                onClick={() => {
                  onJoinEvent();
                }}
              >
                Join Event
              </Button>
            </Stack>
          </ComponentGlobal_CardStyles>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}

function UserNotJoinAndEventReady({
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
                menekan tombol{" "}
                <Text inherit span fw={"bold"}>
                  Konfirmasi Kehadiran
                </Text>{" "}
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
                  onUpdateKonfirmasi();
                }}
              >
                Konfirmasi Kehadiran
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
