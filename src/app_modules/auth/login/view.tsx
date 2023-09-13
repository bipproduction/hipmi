"use client";

import {
  Button,
  Center,
  Flex,
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
      .then((val) => {
        // console.log(val);
        setOtp(val.body.otp);

        return setTimeout(() => router.push("/dev/auth/validasi"), 2000);
      });
  }
  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={"lg"}
        h={"100vh"}
      >
        {/* <Title order={4}>Login</Title> */}
        {/* <Text>abil: 6281339158911</Text>
        <Text>bagas: 6282340374412</Text> */}
        <IconCircleLetterH size={150} />

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
        {/* <Text
          onClick={() => {
            router.push("/dev/auth/register");
          }}
        >
          Register
        </Text> */}
      </Flex>
    </>
  );
}
