"use client";
import { API_RouteNotifikasi } from "@/app/lib/api_user_router/route_api_notifikasi";
import { gs_count_ntf, gs_user_ntf } from "@/app/lib/global_state";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";
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
import { apiGetDataHome } from "./fun/get/api_home";

export default function HomeViewNew() {
  const [countNtf, setCountNtf] = useAtom(gs_count_ntf);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
  const [dataUser, setDataUser] = useState<any>({});
  const [categoryPage, setCategoryPage] = useAtom(gs_notifikasi_kategori_app);
  const router = useRouter();

  useShallowEffect(() => {
    onLoadNotifikasi();
  }, []);

  useShallowEffect(() => {
    if (countNtf != null) {
      setCountNtf(countNtf + newUserNtf);
      setNewUserNtf(0);
    }
  }, [newUserNtf, countNtf]);

  async function onLoadNotifikasi() {
    const loadNotif = await fetch(API_RouteNotifikasi.get_count_by_id());
    const data = await loadNotif.json().then((res) => res.data);
    setCountNtf(data);
  }

  useShallowEffect(() => {
    cekUserLogin();
  }, []);

  async function cekUserLogin() {
    try {
      const response = await apiGetDataHome("?cat=cek_profile");
      if (response.success) {
        setDataUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="HIPMI"
            customButtonLeft={
              <ActionIcon
                radius={"xl"}
                disabled={countNtf == null}
                variant={"transparent"}
                onClick={() => {
                  if (
                    dataUser.profile === undefined ||
                    dataUser?.profile === null
                  ) {
                    router.push(RouterProfile.create, { scroll: false });
                  } else {
                    router.push(RouterUserSearch.main, { scroll: false });
                  }
                }}
              >
                <IconUserSearch color="white" />
              </ActionIcon>
            }
            customButtonRight={
              <ActionIcon
                variant="transparent"
                disabled={countNtf == null}
                onClick={() => {
                  if (
                    dataUser.profile === undefined ||
                    dataUser?.profile === null
                  ) {
                    router.push(RouterProfile.create, { scroll: false });
                  } else {
                    setCategoryPage("Semua");
                    router.push(
                      RouterNotifikasi.categoryApp({ name: "semua" }),
                      {
                        scroll: false,
                      }
                    );
                  }
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
                    <IconBell color="white" />
                  </Indicator>
                ) : (
                  <IconBell color="white" />
                )}
              </ActionIcon>
            }
          />
        }
        footer={<FooterHome />}
      >
        <BodyHome />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
