"use client";

import { MainColor } from "@/app_modules/_global/color";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Button, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function InvalidUser() {
  const router = useRouter();
  const deleteCookie = async () => {
    const sessionKey = process.env.NEXT_PUBLIC_BASE_SESSION_KEY!;
    if (!sessionKey) {
      return;
    }

    try {
      await fetch("/api/auth/logout", {
        method: "GET",
      });
      router.push("/login");
    } catch (error) {
      console.error("Gagal menghapus cookie:", error);
    }
  };

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack align="center" justify="center" spacing="md" h={"100vh"}>
          <Title order={2} c={MainColor.white}>
            {" "}
            Invalid User
          </Title>
          <Button
            radius={"xl"}
            onClick={() => {
              deleteCookie();
            }}
          >
            Logout
          </Button>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
