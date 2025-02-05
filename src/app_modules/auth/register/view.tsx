"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Button, Center, Stack, Text, TextInput, Title } from "@mantine/core";
import { useFocusTrap, useShallowEffect } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth_funDeleteAktivasiKodeOtpByNomor } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import Register_SkeletonView from "./skeleton";
import { clientLogger } from "@/util/clientLogger";
import {
  apiDeleteAktivasiKodeOtpByNomor,
  apiFetchRegister,
  apiGetCheckCodeOtp,
} from "../_lib/api_fetch_auth";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global";

export default function Register() {
  const router = useRouter();
  const [nomor, setNomor] = useState("");
  const [value, setValue] = useState("");
  const [isValue, setIsValue] = useState(false);
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);
  const [idCode, setIdCode] = useState("");

  useShallowEffect(() => {
    const kodeId = localStorage.getItem("hipmi_auth_code_id");
    if (kodeId != null) {
      onCheckAuthCode({ kodeId: kodeId as string });
    } else {
      console.log("code id not found");
    }
  }, []);

  async function onCheckAuthCode({ kodeId }: { kodeId: string }) {
    try {
      const respone = await apiGetCheckCodeOtp({ id: kodeId });
      if (respone) {
        setIdCode(kodeId);
        setNomor(respone.nomor);
      }
    } catch (error) {
      clientLogger.error("Error onCheckAuthCode:", error);
    }
  }

  async function onRegistarsi() {
    try {
      setLoading(true);
      const respone = await apiFetchRegister({ nomor: nomor, username: value });

      if (respone.success) {
        router.push("/waiting-room", { scroll: false });
        ComponentGlobal_NotifikasiBerhasil(respone.message);

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
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan(respone.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error registrasi", error);
    }
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        <Stack h={"100vh"} align="center" justify="center" spacing={50}>
          <Title order={2} c={MainColor.yellow}>
            REGISTRASI
          </Title>

          <IconUserCircle size={100} color={MainColor.white} />

          <Stack spacing={"sm"} w={300}>
            <Stack spacing={0}>
              <Text align="center" c={MainColor.white}>
                Anda akan terdaftar dengan nomor
              </Text>
              {nomor == "" ? (
                <Center>
                  <CustomSkeleton height={20} w={150} />
                </Center>
              ) : (
                <Text align="center" c={MainColor.white} fw={"bold"}>
                  +{nomor}
                </Text>
              )}
            </Stack>
            <TextInput
              ref={focusTrapRef}
              placeholder="Masukan Username"
              maxLength={50}
              error={
                value.length > 0 && value.length < 5 ? (
                  <ComponentGlobal_ErrorInput text="Minimal 5 karakter !" />
                ) : _.values(value).includes(" ") ? (
                  <Stack spacing={5}>
                    <ComponentGlobal_ErrorInput text="Tidak boleh ada space" />
                    <ComponentGlobal_ErrorInput text="Sambungkan huruf meggunakan karakter _" />
                  </Stack>
                ) : isValue ? (
                  <ComponentGlobal_ErrorInput text="Masukan username anda" />
                ) : (
                  ""
                )
              }
              onChange={(val) => {
                val.currentTarget.value.length > 0 ? setIsValue(false) : "";
                setValue(val.currentTarget.value);
              }}
            />
            <Stack>
              <Button
                disabled={
                  value === "" ||
                  value.length < 5 ||
                  _.values(value).includes(" ")
                }
                style={{ transition: "0.5s" }}
                loading={loading ? true : false}
                loaderPosition="center"
                radius={"md"}
                compact
                h={40}
                c={"black"}
                bg={MainColor.yellow}
                color={"yellow"}
                onClick={() => {
                  onRegistarsi();
                }}
              >
                <Text>DAFTAR</Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </UIGlobal_LayoutDefault>
    </>
  );
}
