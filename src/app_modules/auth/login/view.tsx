"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Box, Button, Center, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function Login({ version }: { version: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  async function onLogin() {
    const nomor = phone.substring(1);
    if (nomor.length <= 4) return setError(true);

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ nomor: nomor }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (res.status === 200) {
        localStorage.setItem("hipmi_auth_code_id", result.kodeId);
        ComponentGlobal_NotifikasiBerhasil(result.message, 2000);
        router.push("/validasi", { scroll: false });
      } else {
        ComponentGlobal_NotifikasiPeringatan(result.message);
      }
    } catch (error) {
      console.error(error);
      ComponentGlobal_NotifikasiGagal("Terjadi Kesalahan");
    }
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack align="center" justify="center" h={"100vh"} spacing={100}>
          <Stack align="center" spacing={0}>
            <Title order={3} c={MainColor.yellow}>
              WELCOME TO
            </Title>
            <Title c={MainColor.yellow}>HIPMI APPS</Title>
          </Stack>

          <Stack w={300}>
            <Center>
              <Text c={"white"}>Nomor telepon</Text>
            </Center>
            <PhoneInput
              inputStyle={{ width: "100%" }}
              defaultCountry="id"
              onChange={(val) => {
                setPhone(val);
              }}
            />

            {isError ? (
              <ComponentGlobal_ErrorInput text="Masukan nomor telepon anda" />
            ) : (
              ""
            )}

            <Button
              radius={"md"}
              bg={MainColor.yellow}
              color={"yellow"}
              loading={loading ? true : false}
              loaderPosition="center"
              c={"black"}
              style={{
                borderColor: AccentColor.yellow,
              }}
              onClick={() => {
                onLogin();
              }}
            >
              LOGIN
            </Button>
          </Stack>

          <Box pos={"fixed"} bottom={10}>
            <Text fw={"bold"} c={"white"} fs={"italic"} fz={"xs"}>
              v {version}
            </Text>
          </Box>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
