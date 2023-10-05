"use client";

import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { Warna } from "@/app/lib/warna";
import { gs_token } from "@/app_modules/home/state/global_state";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function CreateProfile() {
  const router = useRouter();
  const [token, setToken] = useAtom(gs_token);

  const [value, setValue] = useState({
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  async function onSubmit() {
    const body = {
      userId: token?.id,
      name: value.name,
      email: value.email,
      alamat: value.alamat,
      jenisKelamin: value.jenisKelamin,
    };

    myConsole(body);

    if (_.values(value).includes("")) return toast("Lengkapi data");
    // if(_.values(value.email).includes(`${/^\S+@\S+$/.test(value.email) ? null : "Invalid email"}`)){}

    await fetch(ApiHipmi.create_profile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 201) {
          toast("Data tersimpan")
          return router.push("/dev/katalog/view");
        } else {
          return toast("Server Error!!!")
        }
      });
  }

  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          label="Nama"
          onChange={(val) => {
            setValue({
              ...value,
              name: val.target.value,
            });
          }}
        />
        <TextInput
          label="Email"
          onChange={(val) => {
            setValue({
              ...value,
              email: val.target.value,
            });
          }}
        />
        <TextInput
          label="Alamat"
          onChange={(val) => {
            setValue({
              ...value,
              alamat: val.target.value,
            });
          }}
        />
        <Select
          label="Jenis Kelamin"
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val) => {
            setValue({
              ...value,
              jenisKelamin: val as string,
            });
          }}
        />
        <Button
          mt={"md"}
          radius={50}
          bg={Warna.hijau_muda}
          color="green"
          onClick={() => onSubmit()}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}