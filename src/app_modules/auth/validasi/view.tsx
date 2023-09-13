"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { gs_Nomor, gs_Otp, valueStatus } from "../state/s_login";
import _ from "lodash";
import toast from "react-simple-toasts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { valueCookies } from "../state/s_token";
import { IconCircleLetterH, IconLetterH } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";

export default function Validasi() {
  const [inputOtp, setInputOtp] = useState("");
  const [otp, setOtp] = useAtom(gs_Otp);
  const [nomor, setNomor] = useAtom(gs_Nomor);
  const [valToken, setToken] = useAtom(valueCookies);

  const router = useRouter();

  async function onValid() {
    const body = {
      nomor: nomor,
    };

    if (_.isEmpty(inputOtp)) return toast("Masukan Pin");
    if (inputOtp != otp) return toast("Kode Salah");

    await fetch("/api/auth/validasi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 200) {
          toast("Selamat datang");
          
          return setTimeout(() => router.push("/dev/home"), 2000);
        } else {
          toast("Regis dulu");
          return setTimeout(() => (router.push("/dev/auth/register"), 2000));
        }
      });
  }

  return (
    <>
      {/* {JSON.stringify(otp)}``
      {JSON.stringify(nomor)} */}
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={50}
        h={"100vh"}
      >
        <Title order={4}>Validasi Kode OTP</Title>
        <IconCircleLetterH size={150} />
        <Flex direction={"column"} gap={"xl"} align={"center"}>
          <Flex justify={"center"} gap={1} direction={"column"} align={"center"}>
            <Text>Enter the 6-digit OTP , we’ve just sent</Text>
            <Text>to {nomor}</Text>
          </Flex>
          <PinInput
            onChange={(val) => {
              setInputOtp(val);
            }}
          />
          <Button
            compact
            radius={50}
            bg={Warna.hijau_tua}
            color="green"
            onClick={() => {
              onValid();
            }}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
