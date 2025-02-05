"use client";

import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
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
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { IconChevronLeft } from "@tabler/icons-react";
import {
  apiDeleteAktivasiKodeOtpByNomor,
  apiGetCheckCodeOtp,
  apiPostVerifikasiCodeOtp,
} from "../_lib/api_fetch_auth";

export default function Validasi() {
  const router = useRouter();
  const [inputCode, setInputOtp] = useState("");
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const [loadingResend, setLoadingResend] = useState(false);
  const [triggerOtp, setTriggerOtp] = useState(false);
  const [idCode, setIdCode] = useState("");

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
    try {
      const respone = await apiGetCheckCodeOtp({ id: kodeId });

      if (respone) {
        setIdCode(kodeId);
        setData({
          nomor: respone.nomor,
          code: respone.otp,
        });
      }
    } catch (error) {
      clientLogger.error("Error onCheckAuthCode:", error);
    }
  }

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  async function onSubmitVerifikasi() {
    if (!inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Kode");
    if (data.code != inputCode)
      return ComponentGlobal_NotifikasiPeringatan("Kode Salah");

    try {
      setLoading(true);
      const respone = await apiPostVerifikasiCodeOtp({ nomor: data.nomor });

      if (respone && respone.success == true) {
        if (respone.roleId == "1") {
          router.push("/login", { scroll: false });
          ComponentGlobal_NotifikasiBerhasil(respone.message);
        } else if (respone.roleId != "1") {
          router.push(RouterAdminDashboard.splash_admin, { scroll: false });
          ComponentGlobal_NotifikasiBerhasil("Admin berhasil login");
        }

        try {
          const responeDelete = await apiDeleteAktivasiKodeOtpByNomor({
            id: idCode,
          });

          if (responeDelete) {
            localStorage.removeItem("hipmi_auth_code_id");
          }
        } catch (error) {
          clientLogger.error("Error apiDeleteAktivasiKodeOtpByNomor:", error);
        }
      } else if (respone && respone.success == false) {
        router.push("/register", { scroll: false });
        ComponentGlobal_NotifikasiBerhasil(respone.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error validasi:", error);
    }
  }

  async function onBack() {
    try {
      router.back();
      111;
      const responeDelete = await apiDeleteAktivasiKodeOtpByNomor({
        id: idCode,
      });

      if (responeDelete) {
        localStorage.removeItem("hipmi_auth_code_id");
      }
    } catch (error) {
      clientLogger.error("Error apiDeleteAktivasiKodeOtpByNomor:", error);
    }
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

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"}>
          <Box
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
          </Box>

          <Stack align="center" justify="center" h={"100vh"} spacing={50}>
            <Title order={2} color={MainColor.yellow}>
              Verifikasi Kode OTP {data.code}
            </Title>

            <Stack spacing={"md"} align="center">
              <Stack spacing={0} align="center">
                <Text c={MainColor.white}>Masukan 4 digit kode otp</Text>
                <Group position="center" spacing={"xs"}>
                  <Text c={MainColor.white}>Yang dikirim ke</Text>
                  {data && data.nomor !== "" ? (
                    <Text fw={"bold"} c={MainColor.white}>
                      +{data.nomor}
                    </Text>
                  ) : (
                    <CustomSkeleton height={15} radius={"xl"} width={150} />
                  )}
                </Group>
              </Stack>
              <Center>
                <PinInput
                  size="xl"
                  type={"number"}
                  ref={focusTrapRef}
                  spacing={"md"}
                  mt={"md"}
                  styles={{ input: { backgroundColor: MainColor.white } }}
                  onChange={(val) => {
                    setInputOtp(val);
                  }}
                />
              </Center>

              <Stack h={"5vh"} align="center" justify="center">
                <Text fs="italic" c={MainColor.white}>
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
                data.nomor == "" && data.code == ""
                  ? null
                  : onSubmitVerifikasi();
              }}
            >
              <Text>VERIFIKASI</Text>
            </Button>
          </Stack>

          {/* {data.nomor == "" && data.code == "" ? <Validasi_SkeletonView /> : ""} */}
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
