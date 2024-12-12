"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { UIGlobal_LayoutDefault } from "@/app_modules/_global/ui";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useFocusTrap, useShallowEffect } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth_funDeleteAktivasiKodeOtpByNomor } from "../fun/fun_edit_aktivasi_kode_otp_by_id";
import Register_SkeletonView from "./skeleton";

export default function Register() {
  const router = useRouter();
  const [nomor, setNomor] = useState("");
  const [value, setValue] = useState("");
  const [isValue, setIsValue] = useState(false);
  const focusTrapRef = useFocusTrap();
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    const kodeId = localStorage.getItem("hipmi_auth_code_id");
    if (kodeId != null) {
      onCheckAuthCode({ kodeId: kodeId as string, onSetData: setNomor });
    } else {
      console.log("code id not found");
    }
  }, [setNomor]);

  async function onCheckAuthCode({
    kodeId,
    onSetData,
  }: {
    kodeId: string;
    onSetData: any;
  }) {
    const res = await fetch(`/api/auth/check?id=${kodeId}`);
    const result = await res.json();

    onSetData(result.nomor);
  }

  async function onRegistarsi() {
    const data = {
      username: value,
      nomor: nomor,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (res.status === 200) {
        localStorage.removeItem("hipmi_auth_code_id");
        ComponentGlobal_NotifikasiBerhasil(result.message);
        router.push("/dev/home", { scroll: false });

        await auth_funDeleteAktivasiKodeOtpByNomor({
          nomor: data.nomor,
        });
      }

      if (res.status === 400) {
        ComponentGlobal_NotifikasiPeringatan(result.message);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <UIGlobal_LayoutDefault>
        {nomor == "" ? (
          <Register_SkeletonView />
        ) : (
          <Stack h={"100vh"} align="center" justify="center" spacing={50}>
            <Title order={2} c={MainColor.yellow}>
              REGISTRASI
            </Title>

            <IconUserCircle size={100} color="white" />

            <Stack spacing={"sm"} w={300}>
              <Text align="center" c={"white"}>
                Anda akan terdaftar dengan nomor berikut{" "}
                <Text inherit span fw={"bold"}>
                  +{nomor}
                </Text>
              </Text>
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
        )}
      </UIGlobal_LayoutDefault>
    </>
  );
}
