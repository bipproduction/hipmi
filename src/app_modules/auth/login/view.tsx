"use client";

import {
  Button,
  Center,
  Flex,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import _ from "lodash";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";
import { atom, useAtom } from "jotai";
import { randomOTP } from "../fun/fun-rondom-otp";
import { gs_Nomor, gs_Otp, valueStatus } from "../state/s_login";
import { IconCircleLetterH } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";

export default function Login() {
  const [nomor, setNomor] = useState("");
  const router = useRouter();
  const [otp, setOtp] = useAtom(gs_Otp);
  const [inputNomor, setInputNomor] = useAtom(gs_Nomor);

  async function onLogin() {
    const body = {
      nomor: nomor,
      otp: randomOTP(),
    };

    // return

    if (_.values(body).includes("")) return toast("Masukan nomor anda");
    setInputNomor(body.nomor);

    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(async (val) => {
        if (val.status == 500) {
          toast(val.message);
        } else {
          setOtp(val.body.otp);
        }

        return setTimeout(() => router.push("/dev/auth/validasi"), 2000);
      });
  }
  return (
    <>
      {/* <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={"lg"}
        h={"100vh"}
      >


      </Flex> */}
      <Center h={"100vh"}>
        <Stack>
          <Center>
            <IconCircleLetterH size={150} />
          </Center>

          <TextInput
            label="Phone Number"
            w={250}
            type="number"
            placeholder="62 xx xxx xxx xxx"
            onChange={(val) => {
              setNomor(val.target.value);
            }}
          />

          <Button
            h={30}
            radius={50}
            compact
            bg={Warna.hijau_muda}
            color={"green"}
            onClick={() => {
              onLogin();
              // console.log(nomor)
            }}
          >
            Login
          </Button>
        </Stack>
      </Center>
    </>
  );
}
