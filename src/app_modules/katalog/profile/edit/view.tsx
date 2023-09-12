"use client";

import { Warna } from "@/app/lib/warna";
import { MyConsole } from "@/app_modules/fun";
import {
  Header,
  Group,
  ActionIcon,
  Title,
  Button,
  Stack,
  TextInput,
  Select,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChecks, IconChevronLeft } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-simple-toasts";
import { getDataProfile } from "../fun/get-profile";
import { loadDataProfile } from "../load/load_profile";
import { gs_Profile, gs_User } from "../state/s_profile";
import { useAtom } from "jotai";
import { ModelProfile } from "../model/interface";

export default function EditProfile({
  dataUser,
  dataProfile,
}: {
  dataUser: any;
  dataProfile: any;
}) {
  const router = useRouter();
  const [valUser, setUser] = useAtom(gs_User);
  const [valProfile, setProfile] = useAtom(gs_Profile);

  const [edit, setEdit] = useState({
    username: "",
    nomor: "",
    name: "",
    email: "",
    alamat: "",
  });

  async function onUpdate() {
    const body = {
      id: valProfile?.id,
      username: valUser?.username,
      nomor: valUser?.nomor,
      name: valProfile?.name,
      email: valProfile?.email,
      alamat: valProfile?.alamat,
      jenisKelamin: valProfile?.jenisKelamin,
    };

    if (_.values(body).includes("")) return toast("Lengkapi Data");
    if (_.values(body.username).length < 8)
      return toast("Username minimal 8 karakter");
    if (_.values(body.nomor).length < 10) return toast("Nomor minimal 10 ");
    if (_.values(body.nomor).length > 13)
      return toast("Nomor maksimal 13 karakter");

    MyConsole(body);

    // Kirim data ke database
    await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(async (val) => {
        if (val.status === 200) {
          toast("Berhasil");
          loadDataProfile(valUser?.id, setUser, setProfile);
          return setTimeout(() => router.push("/dev/katalog/view"), 2000);
        } else {
          toast("Gagal");
        }
      });
  }

  if (!valUser) return <></>;
  if (!valProfile) return <></>;

  return (
    <>
      {/* {JSON.stringify(valUser, null, 2)}
      {JSON.stringify(valProfile, null, 2)} */}
      <Stack px={30} pt={20}>

        <TextInput
          label="Username"
          placeholder={"Username"}
          value={valUser?.username}
          onChange={(val) => {
            setUser({
              ...valUser,
              username: val.target.value,
            });
          }}
        />
        <TextInput
          label="Nomor"
          type="number"
          value={valUser?.nomor}
          onChange={(val) => {
            setUser({
              ...valUser,
              nomor: val.target.value,
            });
          }}
        />

        <TextInput
          label="Nama"
          placeholder="Nama"
          value={valProfile?.name}
          onChange={(val) => {
            setProfile({
              ...valProfile,
              name: val.target.value,
            });
          }}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          value={valProfile?.email}
          onChange={(val) => {
            setProfile({
              ...valProfile,
              email: val.target.value,
            });
          }}
        />
        <TextInput
          label="Alamat"
          placeholder="Alamat"
          value={edit.alamat ? edit.alamat : valProfile?.alamat}
          onChange={(val) => {
            setProfile({
              ...valProfile,
              alamat: val.target.value,
            });
          }}
        />

        <Select
          disabled
          label="Jenis Kelamin"
          placeholder="Pilih salah satu"
          value={dataProfile?.jenisKelamin}
          data={[
            { label: "Laki - laki", value: "Laki - laki" },
            { label: "Perempuan", value: "Perempuan" },
          ]}
        />

        <Button
          radius={"xl"}
          bg={Warna.hijau_muda}
          color="green"
          onClick={() => {
            onUpdate();
          }}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
