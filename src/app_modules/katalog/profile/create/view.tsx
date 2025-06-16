"use client";

import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_BoxInformation,
  ComponentGlobal_ErrorInput,
} from "@/app_modules/_global/component";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { apiGetUserById } from "@/app_modules/_global/lib/api_user";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { emailRegex } from "../../component/regular_expressions";
import { Profile_ComponentCreateNewProfile } from "../_component";
import Profile_ViewUploadBackground from "./view_upload_background";
import Profile_ViewUploadFoto from "./view_upload_foto";

export default function CreateProfile() {
  const [filePP, setFilePP] = useState<File | null>(null);
  const [imgPP, setImgPP] = useState<any | null>();
  const [fileBG, setFileBG] = useState<File | null>(null);
  const [imgBG, setImgBG] = useState<any | null>();

  const [value, setValue] = useState({
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  const [userLoginId, setUserLoginId] = useState<any | null>();
  const [dataProfile, setDataProfile] = useState<any | null>();
  // const router = useRouter();

  useShallowEffect(() => {
    handleGetUserLoginId();
  }, []);

  async function handleGetUserLoginId() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        // console.log("response", response);
        setUserLoginId(response.userId);
        const responseProfile = await apiGetUserById({
          id: response.userId,
        });
        // console.log("responseProfile", responseProfile?.data);
        if (responseProfile?.success) {
          setDataProfile(responseProfile?.data);
        }
      }
    } catch (error) {
      console.log("Error get user login id", error);
    }
  }

  // console.log("userLoginId", userLoginId);
  // console.log("dataProfile", dataProfile);

  if (!dataProfile) return <CustomSkeleton height={400} />;

  return (
    <>
      {dataProfile?.Profile ? (
        <ComponentGlobal_BoxInformation informasi="Anda telah memiliki Profile, Kembali ke Home" />
      ) : (
        <Stack px={"sm"} spacing={40}>
          <Profile_ViewUploadFoto
            imgPP={imgPP}
            onSetImgPP={setImgPP}
            filePP={filePP}
            onSetFilePP={setFilePP}
          />

          <Profile_ViewUploadBackground
            imgBG={imgBG}
            onSetImgBG={setImgBG}
            fileBG={fileBG}
            onSetFileBG={setFileBG}
          />

          <Stack mb={"lg"}>
            <TextInput
              styles={{
                label: { color: MainColor.white },
                input: { backgroundColor: MainColor.white },
                required: { color: MainColor.red },
              }}
              withAsterisk
              label={"Nama"}
              maxLength={50}
              placeholder="Nama lengkap"
              onChange={(val) => {
                setValue({
                  ...value,
                  name: val.target.value,
                });
              }}
            />
            <TextInput
              styles={{
                label: { color: MainColor.white },
                input: { backgroundColor: MainColor.white },
                required: { color: MainColor.red },
              }}
              withAsterisk
              icon={<IconAt size={15} />}
              label="Email"
              maxLength={100}
              placeholder="Contoh: User@gmail.com"
              error={
                value.email.length > 0 && !value.email.match(emailRegex) ? (
                  <ComponentGlobal_ErrorInput text="Invalid Email" />
                ) : (
                  ""
                )
              }
              onChange={(val) => {
                setValue({
                  ...value,
                  email: val.target.value,
                });
              }}
            />
            <TextInput
              styles={{
                label: { color: MainColor.white },
                input: { backgroundColor: MainColor.white },
                required: { color: MainColor.red },
              }}
              withAsterisk
              label="Alamat"
              maxLength={100}
              placeholder="Alamat lengkap"
              onChange={(val) => {
                setValue({
                  ...value,
                  alamat: val.target.value,
                });
              }}
            />

            <Select
              styles={{
                label: { color: MainColor.white },
                input: { backgroundColor: MainColor.white },
                required: { color: MainColor.red },
                dropdown: { backgroundColor: MainColor.white },
              }}
              withAsterisk
              label="Jenis Kelamin"
              placeholder="Pilih satu"
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

            <Profile_ComponentCreateNewProfile
              value={value as any}
              filePP={filePP as File}
              fileBG={fileBG as File}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}
