"use client";

import { MainColor } from "@/app_modules/_global/color";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Button, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvalidUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const deleteCookie = async () => {
    const sessionKey = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
    if (!sessionKey) {
      return;
    }

    try {
      setIsLoading(true);
      await fetch("/api/auth/logout", {
        method: "GET",
      });
      router.push("/login", {scroll: false});
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Gagal menghapus cookie:", error);
    } 
  };

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack align="center" justify="center" spacing="md" h={"100vh"}>
          <Title order={2} c={MainColor.white}>
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan logout terlebih dahulu.
          </Title>
          <Button
            loading={isLoading}
            loaderPosition="center"
            radius={"xl"}
            onClick={() => {
              deleteCookie();
            }}
          >
            Keluar
          </Button>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
