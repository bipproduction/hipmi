"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconMessages } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Forum_Splash() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => {
      router.replace(RouterForum.beranda, { scroll: false });
    }, 500);
  }, []);

  return (
    <>
      <UIGlobal_SplashScreen icon={<IconMessages size={300} />} />
    </>
  );
}
