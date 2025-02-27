"use client";
import { gs_count_ntf, gs_user_ntf } from "@/lib/global_state";
import global_limit from "@/lib/limit";
import { RouterProfile } from "@/lib/router_hipmi/router_katalog";
import { RouterNotifikasi } from "@/lib/router_hipmi/router_notifikasi";
import { RouterUserSearch } from "@/lib/router_hipmi/router_user_search";
import { clientLogger } from "@/util/clientLogger";
import { ActionIcon, Indicator, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBell, IconUserSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainColor } from "../_global/color";
import UIGlobal_LayoutHeaderTamplate from "../_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import { gs_notifikasi_kategori_app } from "../notifikasi/lib";
import BodyHome from "./component/body_home";
import FooterHome from "./component/footer_home";
import { apiGetDataHome, apiGetNotifikasiHome } from "./fun/get/api_home";

export default function HomeViewNew() {
  const [countNtf, setCountNtf] = useAtom(gs_count_ntf);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
  const [dataUser, setDataUser] = useState<any | null>(null);
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);
  const router = useRouter();

  useShallowEffect(() => {
    if (countNtf != null) {
      setCountNtf(countNtf + newUserNtf);
      setNewUserNtf(0);
    }
  }, [newUserNtf, countNtf]);

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
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="HIPMI"
            customButtonLeft={
              !dataUser || !countNtf ? (
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
              !dataUser || !countNtf ? (
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
                    router.push(
                      RouterNotifikasi.categoryApp({ name: "semua" }),
                      {
                        scroll: false,
                      }
                    );
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
        }
        footer={<FooterHome dataUser={dataUser} />}
      >
        <BodyHome dataUser={dataUser} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
