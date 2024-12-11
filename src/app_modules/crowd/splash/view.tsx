"use client";

import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconHeartHandshake } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function SplashCrowd() {
  const router = useRouter();

  useShallowEffect(() => {
    setTimeout(() => router.push(RouterCrowd.main), 500);
  }, []);
  return (
    <>
      <UIGlobal_SplashScreen icon={<IconHeartHandshake size={300} />} />
    </>
  );
}
