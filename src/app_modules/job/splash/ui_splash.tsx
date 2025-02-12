"use client";

import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconBriefcase } from "@tabler/icons-react";
import { useAtom } from "jotai";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import { useRouter } from "next/navigation";
import { gs_job_hot_menu } from "../global_state";

export function Job_UiSplash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);


  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(1);
      router.replace(RouterJob.beranda, { scroll: false });
    }, 1000);
  }, []);
  return (
    <>
      <UIGlobal_SplashScreen icon={<IconBriefcase size={300} />} />
    </>
  );
}
