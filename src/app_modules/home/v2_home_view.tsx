"use client";

import { gs_user_ntf } from "@/lib/global_state";
import global_limit from "@/lib/limit";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useState } from "react";
import { NewUI_Header } from "../_global/ui/new_ui_header";
import { NewUI_Tamplate } from "../_global/ui/new_ui_tamplate";
import { gs_notifikasi_kategori_app } from "../notifikasi/lib";
import { apiGetNotifikasiHome, apiGetDataHome } from "./fun/get/api_home";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { RouterNotifikasi } from "@/lib/router_hipmi/router_notifikasi";
import { RouterUserSearch } from "@/lib/router_hipmi/router_user_search";
import { ActionIcon, Image, Indicator, Text } from "@mantine/core";
import { IconUserSearch, IconBell } from "@tabler/icons-react";
import { AccentColor, MainColor } from "../_global/color";
import { useRouter } from "next/navigation";
import BodyHome from "./component/body_home";
import { NewUI_Footer } from "../_global/ui/new_ui_footer";
import NewFooterHome from "./component/new_footer_home";
import { NewUI_Content } from "../_global/ui/new_ui_content";

export function V2_View_Home() {
  const [countNtf, setCountNtf] = useState<number | null>(null);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
  const [dataUser, setDataUser] = useState<any | null>(null);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);
  const router = useRouter();

  useShallowEffect(() => {
    if (countNtf != null) {
      setCountNtf(countNtf + newUserNtf);
      setNewUserNtf(0);
    }
  }, [newUserNtf]);

  useShallowEffect(() => {
    hanlderLoadData();
  }, []);

  async function hanlderLoadData() {
    try {
      const listLoadData = [
        global_limit(() => onLoadNotifikasi()),
        global_limit(() => cekUserLogin()),
      ];

      await Promise.all(listLoadData);
    } catch (error) {
      clientLogger.error("Error handler load data", error);
    }
  }

  async function onLoadNotifikasi() {
    try {
      const response = await apiGetNotifikasiHome();
      if (response && response.success) {
        setCountNtf(response.data);
      }
    } catch (error) {
      clientLogger.error("Error load notifikasi", error);
    }
  }

  async function cekUserLogin() {
    try {
      const response = await apiGetDataHome({
        path: "?cat=cek_profile",
      });
      if (response && response.success) {
        setDataUser(response.data);
      } else {
        setDataUser(null);
      }
    } catch (error) {
      clientLogger.error("Error get data home", error);
      setDataUser(null);
    }
  }

  return (
    <>
      <NewUI_Tamplate>
        <NewUI_Header
          title="HIPMI"
          customButtonLeft={
            !dataUser && !countNtf ? (
              <ActionIcon radius={"xl"} variant={"transparent"}>
                <IconUserSearch color={"gray"} />
              </ActionIcon>
            ) : dataUser?.profile === undefined ? (
              <ActionIcon
                radius={"xl"}
                variant={"transparent"}
                onClick={() => {
                  router.push(RouterProfile.create, { scroll: false });
                }}
              >
                <IconUserSearch color={MainColor.white} />
              </ActionIcon>
            ) : (
              <ActionIcon
                radius={"xl"}
                variant={"transparent"}
                onClick={() => {
                  router.push(RouterUserSearch.main, { scroll: false });
                }}
              >
                <IconUserSearch color={MainColor.white} />
              </ActionIcon>
            )
          }
          customButtonRight={
            !dataUser && !countNtf ? (
              <ActionIcon radius={"xl"} variant={"transparent"}>
                <IconBell color={"gray"} />
              </ActionIcon>
            ) : dataUser?.profile === undefined ? (
              <ActionIcon
                radius={"xl"}
                variant={"transparent"}
                onClick={() => {
                  router.push(RouterProfile.create, { scroll: false });
                }}
              >
                <IconBell color={MainColor.white} />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant="transparent"
                disabled={countNtf == null}
                onClick={() => {
                  setCategoryPage("Semua");
                  router.push(RouterNotifikasi.categoryApp({ name: "semua" }), {
                    scroll: false,
                  });
                }}
              >
                {countNtf != null && countNtf > 0 ? (
                  <Indicator
                    processing
                    color={MainColor.yellow}
                    label={
                      <Text fz={10} c={MainColor.darkblue}>
                        {countNtf > 99 ? "99+" : countNtf}
                      </Text>
                    }
                  >
                    <IconBell color={MainColor.white} />
                  </Indicator>
                ) : (
                  <IconBell color={MainColor.white} />
                )}
              </ActionIcon>
            )
          }
        />

        <NewUI_Content isScroll="auto">
          <BodyHome dataUser={dataUser} />
        </NewUI_Content>

        <NewUI_Footer>
          <NewFooterHome dataUser={dataUser} />
        </NewUI_Footer>
      </NewUI_Tamplate>
    </>
  );
}
