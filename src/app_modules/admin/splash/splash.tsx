"use client";

import { RouterAdminDashboard } from "@/lib/router_hipmi/router_admin";
import { AspectRatio, Center, Image, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_admin_hotMenu } from "../global_state";
import {
  gs_admin_navbar_menu,
  gs_admin_navbar_subMenu,
} from "../_admin_global/new_global_state";
import { IAdmin_ActivePage } from "../notifikasi/route_setting/type_of_select_page";
import { AccentColor } from "@/app_modules/_global/color";

export default function SplashDashboardAdmin() {
  const router = useRouter();
  const [activeId, setActiveId] = useAtom(gs_admin_navbar_menu);
  const [activeChildId, setActiveChildId] = useAtom(gs_admin_navbar_subMenu);

  useShallowEffect(() => {
    setTimeout(() => {
      router.push(RouterAdminDashboard.main_admin);
      setActiveId("Main");
      setActiveChildId("");
    }, 2000);
  }, []);
  return (
    <>
      <Center h={"100vh"}>
        <Stack spacing={0}>
          <Title c={AccentColor.white}>Welcome Admin</Title>

          <AspectRatio ratio={1 / 1} mah={700} maw={700}>
            <Image src={"/aset/logo/logo-hipmi.png"} alt="Logo" />
          </AspectRatio>
        </Stack>
      </Center>
    </>
  );
}
