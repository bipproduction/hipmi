"use client";

import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconMap2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function UiMap_SplashView() {
  const router = useRouter();

  useShallowEffect(() => {
    setTimeout(() => {
      router.replace(RouterMap.main_view, { scroll: false }), 500;
    });
  }, []);
  return (
    <>
      <UIGlobal_SplashScreen icon={<IconMap2 size={300} />} />
    </>
  );
}
