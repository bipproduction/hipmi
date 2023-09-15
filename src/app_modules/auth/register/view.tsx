"use client";

import { Flex, Title, TextInput, Button, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import _ from "lodash";
import toast from "react-simple-toasts";
import { useAtom } from "jotai";
import { gs_Nomor } from "../state/s_login";
import { IconCircleLetterH } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";

export default function Register() {
  const [nomor, setNomor] = useAtom(gs_Nomor);
  const [value, setValue] = useState({
    // nomor: nomor,
    username: "",
  });
  const router = useRouter();

  async function onRegister() {
    if (_.values(value).includes("")) return toast("Isi semua data");
    const body = {
      username: value.username,
      nomor: nomor,
    };

    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 201) {
          toast("Berhasil mendaftar");
          return router.push("/dev/home");
        } else {
          toast("Gagal ");
        }
      });
  }
  return (
    <>
      {/* <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={"xl"}
        h={"100vh"}
      >
        <Title>Register</Title>
       

        <Flex direction={"column"}>
          <TextInput
            placeholder="Username"
            onChange={(val) => {
              setValue({
                ...value,
                username: val.target.value,
              });
            }}
          />
          <Text>Nomor : {nomor}</Text>
        </Flex>
        <Button
          onClick={() => {
            onRegister();
          }}
        >
          Register
        </Button>

        
      </Flex> */}

      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        gap={50}
        h={"100vh"}
      >
        <Title order={4}>Registrasi</Title>
        <IconCircleLetterH size={150} />
        <Flex direction={"column"} gap={"xl"} align={"center"}>
          <Flex direction={"column"}>
            <TextInput
              label="Username"
              placeholder="Username"
              onChange={(val) => {
                setValue({
                  ...value,
                  username: val.target.value,
                });
              }}
            />

            <Text>Nomor : {nomor}</Text>
          </Flex>
          <Button
            radius={50}
            bg={Warna.biru}
            color="cyan"
            compact
            onClick={() => {
              onRegister();
            }}
          >
            Register
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
