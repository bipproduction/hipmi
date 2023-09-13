"use client";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Header,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { valueCookies } from "../../../auth/state/s_token";
import _ from "lodash";
import toast from "react-simple-toasts";
import { IconChevronLeft } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";

export default function CreateProfile() {
  const router = useRouter();
  const [token, setToken] = useAtom(valueCookies);

  const [dataProfile, setDataProfile] = useState({
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  // Cek data dan kirim data ke database
  async function onCreated() {
    const body = {
      name: dataProfile.name,
      email: dataProfile.email,
      alamat: dataProfile.alamat,
      jenisKelamin: dataProfile.jenisKelamin,
      userId: token?.data?.id,
    };
    // console.log(body);
    if (_.values(body).includes("")) return toast("Lengkapi data");

    await fetch("/api/profile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 201) {
          toast("Data tersimpan");
          setTimeout(() => {
            router.push("/dev/katalog/view");
          }, 2000);
        } else {
          toast("Gagal mendaftar");
        }
      });
  }

  return (
    <>
      <Stack px={30} pt={20}>
        <TextInput
          label="Nama"
          placeholder="Nama"
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              name: val.target.value,
            });
          }}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              email: val.target.value,
            });
          }}
        />
        <TextInput
          label="Alamat"
          placeholder="Alamat"
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              alamat: val.target.value,
            });
          }}
        />

        <Select
          label="Jenis Kelamin"
          placeholder="Pilih salah satu"
          data={[
            { label: "Laki - laki", value: "Laki - laki" },
            { label: "Perempuan", value: "Perempuan" },
          ]}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              jenisKelamin: val as any,
            });
          }}
        />

        <Button
          radius={"xl"}
          bg={Warna.hijau_muda}
          color="green"
          onClick={() => {
            onCreated();
          }}
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
