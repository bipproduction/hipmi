"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import {
  Button,
  Center,
  Loader,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useFocusTrap, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global";
import { auth_funDeleteAktivasiKodeOtpByNomor } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import Validasi_SkeletonView from "./skeleton";

export default function Validasi() {
  const router = useRouter();
  const [inputCode, setInputOtp] = useState("");
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const [loadingResend, setLoadingResend] = useState(false);
  const [triggerOtp, setTriggerOtp] = useState(false);

  const [data, setData] = useState({
    nomor: "",
    code: "",
  });

  useShallowEffect(() => {
    const kodeId = localStorage.getItem("hipmi_auth_code_id");
    if (kodeId != null) {
      onCheckAuthCode({ kodeId: kodeId as string });
    } else {
      console.log("code id not found");
    }

    if (triggerOtp) {
      const kodeId = localStorage.getItem("hipmi_auth_code_id");
      if (kodeId != null) {
        onCheckAuthCode({ kodeId: kodeId as string });
      } else {
        console.log("code id not found");
      }
      setTriggerOtp(false);
    }
  }, [triggerOtp]);

  async function onCheckAuthCode({ kodeId }: { kodeId: string }) {
    const res = await fetch(`/api/auth/check?id=${kodeId}`);
    const result = await res.json();

    setData({
      nomor: result.nomor,
      code: result.otp,
    });
  }

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  async function onVerifikasi() {
    if (!inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Kode");
    if (data.code != inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Kode Salah");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/validasi", {
        method: "POST",
        body: JSON.stringify({
          nomor: data.nomor,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (res.status === 200 && result.roleId == "1") {
        ComponentGlobal_NotifikasiBerhasil(result.message);
        localStorage.removeItem("hipmi_auth_code_id");
        await auth_funDeleteAktivasiKodeOtpByNomor({
          nomor: data.nomor,
        });
        router.push(RouterHome.main_home, { scroll: false });
        return;
      }

      if (res.status === 200 && result.roleId != "1") {
        ComponentGlobal_NotifikasiBerhasil("Admin Logged in");
        localStorage.removeItem("hipmi_auth_code_id");
        await auth_funDeleteAktivasiKodeOtpByNomor({
          nomor: data.nomor,
        });
        router.push(RouterAdminDashboard.splash_admin, { scroll: false });
        return;
      }

      if (res.status === 404) {
        router.push("/register", { scroll: false });
        ComponentGlobal_NotifikasiBerhasil(result.message);
        return;
      }

      if (res.status === 400) {
        ComponentGlobal_NotifikasiPeringatan(result.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onBack() {
    localStorage.removeItem("hipmi_auth_code_id");
    await auth_funDeleteAktivasiKodeOtpByNomor({ nomor: data.nomor });
    router.back();
  }

  async function onResendCode() {
    setLoadingResend(true);
    localStorage.removeItem("hipmi_auth_code_id");

    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        body: JSON.stringify({ nomor: data.nomor }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (res.status === 200) {
        localStorage.setItem("hipmi_auth_code_id", result.kodeId);
        ComponentGlobal_NotifikasiBerhasil("Kode Berhasil Dikirim", 2000);
        setTriggerOtp(true);
        setCounter(60);
        setLoadingResend(false);
        //  router.push("/validasi", { scroll: false });
      } else {
        setLoadingResend(false);
        ComponentGlobal_NotifikasiPeringatan(result.message);
      }
    } catch (error) {
      console.error(error);
      setLoadingResend(false);
      ComponentGlobal_NotifikasiGagal("Terjadi Kesalahan");
    }
  }

  // console.log(data.code);

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"}>
          {/* <Box
            pt={"md"}
            px={"md"}
            style={{
              position: "sticky",
              top: 0,
            }}
          >
            <ActionIcon variant="transparent" onClick={() => onBack()}>
              <IconChevronLeft color="white" />
            </ActionIcon>
          </Box> */}
          {data.nomor == "" && data.code == "" ? (
            <Validasi_SkeletonView />
          ) : (
            <Stack align="center" justify="center" h={"100vh"} spacing={50}>
              <Title order={2} color={MainColor.yellow}>
                Verifikasi Kode OTP
              </Title>

              <Stack spacing={"md"} align="center">
                <Stack spacing={0} align="center">
                  <Text c={"white"}>Masukan 4 digit kode otp</Text>
                  <Text c={"white"}>
                    Yang dikirim ke{" "}
                    <Text span inherit fw={"bold"}>
                      {" "}
                      +{data.nomor}
                    </Text>
                  </Text>
                </Stack>
                <Center>
                  <PinInput
                    size="xl"
                    type={"number"}
                    ref={focusTrapRef}
                    spacing={"md"}
                    mt={"md"}
                    onChange={(val) => {
                      setInputOtp(val);
                    }}
                  />
                </Center>

                <Stack h={"5vh"} align="center" justify="center">
                  <Text fs="italic" c={"white"}>
                    Tidak menerima kode ?{" "}
                    {counter > 0 ? (
                      <Text fw={"bold"} inherit span>
                        {counter + "s"}
                      </Text>
                    ) : loadingResend ? (
                      <Loader ml={"sm"} size={"xs"} color="yellow" />
                    ) : (
                      <Text
                        inherit
                        span
                        onClick={() => {
                          onResendCode();
                        }}
                        fw={"bold"}
                      >
                        Kirim ulang
                      </Text>
                    )}
                  </Text>
                </Stack>
              </Stack>
              <Button
                w={300}
                loading={loading ? true : false}
                loaderPosition="center"
                radius={"md"}
                compact
                h={40}
                c={"black"}
                bg={MainColor.yellow}
                color={"yellow"}
                style={{
                  borderColor: AccentColor.yellow,
                }}
                onClick={() => {
                  onVerifikasi();
                }}
              >
                <Text>VERIFIKASI</Text>
              </Button>
            </Stack>
          )}
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
