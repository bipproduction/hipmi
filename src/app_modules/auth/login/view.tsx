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
import { clientLogger } from "@/util/clientLogger";
import { Box, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { apiFetchLogin } from "../_lib/api_fetch_auth";

export default function Login({ version }: { version: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  async function onLogin() {
    const nomor = phone.substring(1);
    if (nomor.length <= 4) return setError(true);

    try {
      setLoading(true);
      const respone = await apiFetchLogin({ nomor: nomor });

      if (respone && respone.success) {
        localStorage.setItem("hipmi_auth_code_id", respone.kodeId);
        ComponentGlobal_NotifikasiBerhasil(respone.message, 2000);
        router.push("/validasi", { scroll: false });
      } else {
        setLoading(false);
        console.log("respone >>", respone);
        ComponentGlobal_NotifikasiPeringatan(respone?.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error login:", error);
      ComponentGlobal_NotifikasiGagal("Terjadi Kesalahan");
    }
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack align="center" justify="center" h={"100vh"} spacing={100}>
          <Stack spacing={0}>
            <Stack align="center" spacing={0}>
              <Title order={3} c={MainColor.yellow}>
                WELCOME TO
              </Title>
              <Title order={2} c={MainColor.yellow}>
                HIPMI BADUNG APPS
              </Title>
            </Stack>
            <Group position="right" w={"100%"}>
              <Text c={MainColor.white} ff={"serif"} fz={10}>
                powered by muku.id
              </Text>
            </Group>
          </Stack>
          <Stack w={300}>
            <Center>
              <Text c={MainColor.white}>Nomor telepon</Text>
            </Center>
            <PhoneInput
              countrySelectorStyleProps={{
                buttonStyle: {
                  backgroundColor: MainColor.login,
                },
              }}
              inputStyle={{ width: "100%", backgroundColor: MainColor.login }}
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
            <Text fw={"bold"} c={MainColor.white} fs={"italic"} fz={"xs"}>
              v {version}
            </Text>
          </Box>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
