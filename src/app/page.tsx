"use client";

import { SplashScreen } from "@/app_modules/auth";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => {
      // window.location.replace("/dev/home");
      router.replace("/dev/home", { scroll: false });
    }, 1000);
  }, []);

  return <SplashScreen />;
}
