"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { clientLogger } from "@/util/clientLogger";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { emailRegex } from "../../component/regular_expressions";
import { Profile_funEditById } from "../fun/update/fun_edit_profile_by_id";
import { MODEL_PROFILE } from "../model/interface";

export default function EditProfile({ data }: { data: MODEL_PROFILE }) {
  const router = useRouter();

  //Get data profile
  const [dataProfile, setDataProfile] = useState(data);
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    const body = dataProfile;

    // console.log(body)
    if (_.values(body).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");
    if (!body.email.match(emailRegex))
      return ComponentGlobal_NotifikasiPeringatan("Format email salah");

    try {
      setLoading(true);
      const res = await Profile_funEditById(body);
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update foto profile", error);
    }
  }

  if (!dataProfile)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      <Stack px={"sm"}>
        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
          }}
          withAsterisk
          label="Nomor"
          disabled
          value={dataProfile?.User?.nomor}
        />

        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
          }}
          withAsterisk
          label="Username"
          error={
            data?.User?.username?.length < 5
              ? "Username minimal 5 karakter"
              : ""
          }
          disabled
          value={dataProfile?.User?.username}
          onChange={(val) => {
            // const dataUsername = _.clone(dataProfile)
            setDataProfile({
              ...(dataProfile as any),
              User: {
                username: val.target.value,
              },
            });
          }}
        />

        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
          }}
          withAsterisk
          label="Nama"
          placeholder="nama"
          maxLength={50}
          error={
            dataProfile?.name === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan nama" />
            ) : (
              ""
            )
          }
          value={dataProfile?.name}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              name: val.target.value,
            });
          }}
        />

        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
          }}
          withAsterisk
          label="Email"
          placeholder="email"
          error={
            dataProfile?.email === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan email " />
            ) : dataProfile?.email?.length > 0 &&
              !dataProfile?.email.match(emailRegex) ? (
              <ComponentGlobal_ErrorInput text="Invalid email" />
            ) : (
              ""
            )
          }
          value={dataProfile?.email}
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              email: val.target.value,
            });
          }}
        />

        <TextInput
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
          }}
          withAsterisk
          label="Alamat"
          placeholder="alamat"
          value={dataProfile.alamat}
          maxLength={100}
          error={
            dataProfile?.alamat === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan alamat " />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setDataProfile({
              ...dataProfile,
              alamat: val.target.value,
            });
          }}
        />

        <Select
          styles={{
            label: {
              color: MainColor.white,
            },
            input: {
              backgroundColor: MainColor.white,
            },
          }}
          withAsterisk
          label="Jenis Kelamin"
          value={dataProfile?.jenisKelamin}
          data={[
            { value: "Laki-laki", label: "Laki-laki" },
            { value: "Perempuan", label: "Perempuan" },
          ]}
          onChange={(val: any) => {
            setDataProfile({
              ...dataProfile,
              jenisKelamin: val,
            });
          }}
        />

        <Button
          mt={"md"}
          radius={50}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
          loading={loading ? true : false}
          loaderPosition="center"
          onClick={() => onUpdate()}
        >
          Update
        </Button>
      </Stack>

    </>
  );
}
