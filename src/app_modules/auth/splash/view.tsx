"use client";

import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Avatar, BackgroundImage, Center, Image, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  // useShallowEffect(() => {
  //   setTimeout(() => {
  //     router.push("/dev/home", { scroll: false });
  //   }, 1000);
  // }, []);

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Center h={"100vh"}>
          <Stack align="center" justify="center" p={"md"}>
            {/* <Title c={"#002e59"}>Welcome to</Title> */}
            <Avatar size={300} radius={"100%"}>
              <Image
                height={250}
                width={250}
                alt="Logo"
                src={"/aset/logo/logo-hipmi.png"}
              />
            </Avatar>
          </Stack>
        </Center>
      </UIGlobal_LayoutDefault>
    </>
  );
}
