"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconPresentation } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_event_hotMenu } from "../global_state";

export default function Event_SplashScreen() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);

  useShallowEffect(() => {
    setTimeout(() => {
      router.replace(RouterEvent.beranda);
      setHotMenu(0);
    }, 500);
  }, []);
  return (
    <>
      <UIGlobal_SplashScreen icon={<IconPresentation size={300} />} />
    </>
  );
}
