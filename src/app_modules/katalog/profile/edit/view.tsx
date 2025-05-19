"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_ErrorInput from "@/app_modules/_global/component/error_input";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { clientLogger } from "@/util/clientLogger";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { emailRegex } from "../../component/regular_expressions";
import { Profile_SkeletonViewEdit } from "../_component/skeleton_view";
import {
  apiGetOneProfileById,
  apiUpdateProfile,
} from "../lib/api_fetch_profile";
import { MODEL_PROFILE } from "../model/interface";
import { masterJenisKelamin } from "@/app_modules/_global/lib/master_jenis_kelamin";

export default function EditProfile() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const profileId = params.id;

  //Get data profile
  const [data, setData] = useState<MODEL_PROFILE | null>(null);
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneProfileById({ id: profileId });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data profile", error);
    }
  }

  async function onUpdate() {
    // console.log(body)
    if (_.values(data).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");
    if (!data?.email.match(emailRegex))
      return ComponentGlobal_NotifikasiPeringatan("Format email salah");

    try {
      setLoading(true);
      const respone = await apiUpdateProfile({ data: data });

      if (respone && respone.success == true) {
        ComponentGlobal_NotifikasiBerhasil(respone.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(respone.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error client update profile", error);
    }
  }

  if (!data) return <Profile_SkeletonViewEdit />;

  return (
    <>
      <Stack px={"sm"}>
        {/* <TextInput
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
        /> */}

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
            data?.name === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan nama" />
            ) : (
              ""
            )
          }
          value={data?.name}
          onChange={(val) => {
            setData({
              ...data,
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
            data?.email === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan email " />
            ) : data?.email?.length > 0 && !data?.email.match(emailRegex) ? (
              <ComponentGlobal_ErrorInput text="Invalid email" />
            ) : (
              ""
            )
          }
          value={data?.email}
          onChange={(val) => {
            setData({
              ...data,
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
          value={data.alamat}
          maxLength={100}
          error={
            data?.alamat === "" ? (
              <ComponentGlobal_ErrorInput text="Masukan alamat " />
            ) : (
              ""
            )
          }
          onChange={(val) => {
            setData({
              ...data,
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
          value={data?.jenisKelamin}
          data={masterJenisKelamin}
          onChange={(val: any) => {
            setData({
              ...data,
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
          loading={loading}
          loaderPosition="center"
          onClick={() => onUpdate()}
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
