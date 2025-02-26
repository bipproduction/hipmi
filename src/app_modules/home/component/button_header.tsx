"use client";

import { gs_user_ntf } from "@/lib/global_state";
import { RouterNotifikasi } from "@/lib/router_hipmi/router_notifikasi";
import { RouterUserSearch } from "@/lib/router_hipmi/router_user_search";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasi_countUserNotifikasi from "@/app_modules/notifikasi/fun/count/fun_count_by_id";
import { gs_notifikasi_kategori_app } from "@/app_modules/notifikasi/lib";
import { ActionIcon, Indicator, Loader, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBell, IconUserSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MODEL_USER } from "../model/interface";

export function ComponentHome_ButtonHeaderLeft({
  dataUser,
}: {
  dataUser: MODEL_USER;
}) {
  const router = useRouter();
  const [isLoadingUS, setIsLoadingUS] = useState(false);

  return (
    <>
      <ActionIcon
        radius={"xl"}
        variant={"transparent"}
        onClick={() => {
          if (dataUser?.Profile === null) {
            ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
          } else {
            setIsLoadingUS(true);
            router.push(RouterUserSearch.main, { scroll: false });
          }
        }}
      >
        {isLoadingUS ? (
          <Loader color={AccentColor.yellow} size={20} />
        ) : (
          <IconUserSearch color="white" />
        )}
      </ActionIcon>
    </>
  );
}

export function ComponentHome_ButtonHeaderRight({
  dataUser,
  countNotifikasi,
}: {
  dataUser: MODEL_USER;
  countNotifikasi: number;
}) {
  const router = useRouter();
  const [isLoadingBell, setIsLoadingBell] = useState(false);

  // Notifikasi
  // const [countNtf, setCountNtf] = useState(countNotifikasi);
  // const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);

  // useEffect(() => {
  //   onLoadNotifikasi({
  //     onLoad(val) {
  //       setCountNtf(val);
  //     },
  //   });
  // }, [setCountNtf]);

  // useShallowEffect(() => {
  //   setCountNtf(countNtf + newUserNtf);
  //   setNewUserNtf(0);
  // }, [newUserNtf, setCountNtf]);

  // async function onLoadNotifikasi({ onLoad }: { onLoad: (val: any) => void }) {
  //   const loadNotif = await notifikasi_countUserNotifikasi();
  //   onLoad(loadNotif);
  // }

  return (
    <>
      <ActionIcon
        variant="transparent"
        onClick={() => {
          if (dataUser?.Profile === null) {
            ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
          } else {
            router.push(RouterNotifikasi.categoryApp({ name: "semua" }), {
              scroll: false,
            });
            setCategoryPage("Semua");
            setIsLoadingBell(true);
          }
        }}
      >
        {isLoadingBell ? (
          <Loader color={AccentColor.yellow} size={20} />
        ) : countNotifikasi === 0 ? (
          <IconBell color="white" />
        ) : (
          <Indicator
            processing
            color={MainColor.yellow}
            label={
              <Text fz={10} c={MainColor.darkblue}>
                {countNotifikasi > 99 ? "99+" : countNotifikasi}
              </Text>
            }
          >
            <IconBell color="white" />
          </Indicator>
        )}
      </ActionIcon>
    </>
  );
}
