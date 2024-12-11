"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import UIGlobal_SplashScreen from "@/app_modules/_global/ui/ui_splash";
import { useShallowEffect } from "@mantine/hooks";
import { IconAffiliate } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_colab_hot_menu } from "../global_state";

export default function Colab_Splash() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);

  useShallowEffect(() => {
    setTimeout(() => {
      setHotMenu(1);
      // setStatus("Publish");
      router.replace(RouterColab.beranda, {scroll: false});
    }, 500);
  }, []);

  return (
    <>
      {/* <Center h={"100vh"}>
        <Paper p={{ base: 50, md: 60, lg: 80 }}>
          <Image alt="logo" src={"/aset/colab/logo.png"} />
        </Paper>
      </Center> */}
      <UIGlobal_SplashScreen icon={<IconAffiliate size={300} />} />
    </>
  );
}
