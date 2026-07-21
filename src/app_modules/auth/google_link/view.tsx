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
import { Alert, Box, Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { apiFetch_googleLink } from "./_lib/api_fetch_google_link";

type FormState = "INPUT_NOMOR" | "CONFIRM_OVERRIDE" | "NEED_USERNAME";

export function GoogleLinkView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const name = searchParams.get("name") ?? "";

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState<FormState>("INPUT_NOMOR");
  const [existingEmailMasked, setExistingEmailMasked] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  async function submit(opts?: { confirmOverride?: boolean }) {
    const nomor = phone.substring(1);
    if (nomor.length <= 4) return setError(true);
    setError(false);

    if (state === "NEED_USERNAME" && username.trim().length < 5) {
      ComponentGlobal_NotifikasiPeringatan("Username minimal 5 karakter");
      return;
    }

    setLoading(true);
    try {
      const result = await apiFetch_googleLink({
        nomor,
        email,
        username: state === "NEED_USERNAME" ? username.trim() : undefined,
        confirmOverride: opts?.confirmOverride,
      });

      if (!result.success) {
        ComponentGlobal_NotifikasiGagal(result.message);
        return;
      }

      switch (result.status) {
        case "LINKED":
        case "REGISTERED":
          ComponentGlobal_NotifikasiBerhasil("Berhasil masuk", 1500);
          router.replace("/dev/home");
          break;
        case "CONFIRM_OVERRIDE":
          setExistingEmailMasked(result.existingEmailMasked);
          setState("CONFIRM_OVERRIDE");
          break;
        case "NEED_USERNAME":
          setState("NEED_USERNAME");
          break;
      }
    } catch (error) {
      console.error(error);
      ComponentGlobal_NotifikasiGagal("Terjadi Kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UIGlobal_LayoutDefault>
      <Stack justify="center" h={"100vh"} px={"lg"}>
        <Stack spacing={"xs"} mb={"md"}>
          <Title order={3} c={"white"}>
            Hubungkan Akun
          </Title>
          <Text c={"white"} fz={"sm"}>
            {name ? `Halo ${name}, ` : ""}akun Google{" "}
            <b>{email}</b> belum terhubung. Masukkan nomor HP Anda.
          </Text>
        </Stack>

        <Stack spacing={"sm"}>
          <PhoneInput
            defaultCountry="id"
            value={phone}
            onChange={(val) => setPhone(val)}
            disabled={state === "CONFIRM_OVERRIDE"}
            inputStyle={{
              width: "100%",
              height: 44,
              fontSize: 14,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
            countrySelectorStyleProps={{
              buttonStyle: {
                height: 44,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                paddingInline: 8,
              },
            }}
            style={{ width: "100%" }}
          />

          {isError && (
            <ComponentGlobal_ErrorInput text="Masukan nomor telepon anda" />
          )}

          {state === "NEED_USERNAME" && (
            <Box>
              <Text c={"white"} fz={"sm"} mb={4}>
                Nomor belum terdaftar. Buat username untuk mendaftar:
              </Text>
              <TextInput
                placeholder="username (min. 5 karakter)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
          )}

          {state === "CONFIRM_OVERRIDE" && (
            <Alert color="yellow" title="Email berbeda terdeteksi">
              <Text fz={"sm"}>
                Akun ini sudah memakai email lain ({existingEmailMasked}).
                Ganti dengan {email}?
              </Text>
              <Button
                mt={"sm"}
                fullWidth
                h={44}
                radius={8}
                bg={MainColor.yellow}
                c={"black"}
                fw={600}
                loading={loading}
                onClick={() => submit({ confirmOverride: true })}
              >
                Ya, Ganti Email
              </Button>
            </Alert>
          )}

          {state !== "CONFIRM_OVERRIDE" && (
            <Button
              fullWidth
              h={44}
              radius={8}
              bg={MainColor.yellow}
              color={"yellow"}
              c={"black"}
              fw={600}
              loading={loading}
              loaderPosition="center"
              style={{ borderColor: AccentColor.yellow }}
              onClick={() => submit()}
            >
              {state === "NEED_USERNAME" ? "DAFTAR" : "LANJUTKAN"}
            </Button>
          )}
        </Stack>
      </Stack>
    </UIGlobal_LayoutDefault>
  );
}
